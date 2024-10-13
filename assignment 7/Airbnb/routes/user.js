const express=require('express');
const db=require('../db');
const utils=require('../Utils');
const crypto = require('crypto-js')
const jwt=require('jsonwebtoken')
const router=express.Router();
const config=require('../config')

router.post("/login",(request, response)=>
{
    {
        const{email,password}=request.body;
        const queryText=`select id,firstname,lastname,phoneNumber,isDeleted from user where email=? and password=?`;
       
        const encryptedPassword=String(crypto.SHA256(password))
        db.pool.query(queryText,[email,encryptedPassword],(error,users)=>
        {
            if(error)
        {
            response.send(utils.createErrorResult(error));

        }
        else{
            if(users.length==0)
            {
                response.send(utils.createErrorResult('user does not exists'))
            }
            else{
                const user=users[0]
                //console.log(user);
                if(user.isDeleted)
                {
                    response.send(utils.createErrorResult('your account is closed'))
                }
               else {
                    const payload ={id: user.id}
                    const token=jwt.sign(payload, config.secret)
                    const userData={
                        token,
                        name:`${user['firstName']}$(user['lastName'])`,
                    }
                    response.send(utils.createSuccessResult(userData))
                }
            } 
       
    }
    });
}
});
router.put('/profile/',(request,response)=>
    {
        const{firstName,lastname,phoneNumber}=request.body
        const stmt=`update user set firstName=?,lastName=?, phoneNumber=? where id=?;`
        db.pool.execute(
            stmt,[firstName,lastname,phoneNumber,request.userId],
            (error,result)=>
            {
                response.send(utils.createResult(error,result))
            }
    
        )
    }
    )
    router.get('/profile/',(request,response)=>
    {
        const stmt=`select firstName,lastName,phoneNumber,email from user where id=?;`
        db.pool.query(stmt,[request.userId],(error,result)=>
        {
            response.send(utils.createResult(error,result))
        })
    })
    router.get('/profile/:id',(request,response)=>
    {
        const{id}=request.params
        const stmt=`select * from user where id=?;`
        db.pool.execute(stmt,[id],(error,properties)=>
        {
            response.send(utils.createResult(error,properties[0]))
        })
    })
router.post("/register",(request, response)=>
    {
        {
            const{firstname,lastname,email,password,phoneNumber}=request.body;
            const queryText=`insert into user(firstname,lastname,email,password,phoneNumber)values(?,?,?,?,?)`;
           const encryptedPassword = String(crypto.SHA256(password))
            db.pool.execute(queryText,
            [firstname,lastname,email,encryptedPassword,phoneNumber],
            (error,result)=>
            {
              response.send(utils.createResult(error,result))
        });
    }
    });



    

module.exports=router;
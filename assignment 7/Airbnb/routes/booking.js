const express=require('express')
const db=require("../db")
const util=require("../Utils")
const config=require("../config")
const router=express.Router()

router.get('/',(request,response)=>
{
const stmt=`select * from bookings;`
db.pool.query(stmt,(error,bookings)=>
{
    response.send(util.createResult(error,bookings))
})
})

router.post('/',(request,response)=>
{
    const{propertyId,total,fromDate,toDate}=request.body
    const stmt=`insert into bookings(userId,propertyid,total,fromDate,toDate) values(?,?,?,?,?);`
    db.pool.execute(stmt,[request.userId,propertyId,total,fromDate,toDate],
        (error,bookings)=>
        {
            response.send(util.createResult(error,bookings))
        }
    )
})
module.exports=router;

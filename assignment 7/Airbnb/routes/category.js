const express=require('express');
const db=require('../db');
const util=require('../Utils')

const multer=require('multer')

//upload files
const upload=multer({dest:'images'})

const router=express.Router()

router.get('/',(request,response)=>
{
    const stmt=`select id,title,details,image from category;`
    db.pool.query(stmt,(error,categories)=>
    {
        response.send(util.createResult(error,categories))
    })
}
)

//use the middleware (upload) to upload a single icon
router.post('/',upload.single('icon'),(request,response)=>
{
    const {title,details}=request.body

    //get the name of uploaded file
    const fileName=request.file.filename

    const stmt=`insert into category(title,details,image)values(?,?,?);`
    db.pool.execute(
        stmt,[title,details,fileName],
        (error,categories)=>{
            response.send(util.createResult(error,categories))
        }
    )
})
module.exports=router; 
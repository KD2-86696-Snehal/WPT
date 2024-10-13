const express=require('express');
const db=require('../db');
const util=require('../Utils');
const router=express.Router();


router.post("/",(request,response)=>
{
    const {
        categoryId,
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
    }=request.body

    const queryText=`insert into property( categoryId,title, details,
        address,contactNo,ownerName,isLakeView,isTV,isAC,
        isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,
        beds,bathrooms,rent)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        db.pool.execute(
            queryText,
        [
        categoryId,
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
        ],
            (error,result)=>
            {
                response.send(util.createResult(error,result))
            }
    );

});

router.get('/',(request,response)=>
{
    const stmt=`select * from  property;`
    db.pool.execute(stmt,(error,properties)=>{
            response.send(util.createResult(error,properties))
        }
    )
})
module.exports=router


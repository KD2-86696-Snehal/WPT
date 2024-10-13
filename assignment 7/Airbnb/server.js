const express=require('express');
const util=require('../Airbnb/Utils')
const userrouter=require('../Airbnb/routes/user');
const propertyrouter=require('../Airbnb/routes/property');
const categoryrouter=require('../Airbnb/routes/category')
const config=require("../Airbnb/config")
const bookingrouter=require("../Airbnb/routes/booking")
const jwt=require('jsonwebtoken')

const app=express();
app.use(express.json());

//middleware to verify the token
app.use((request,response,next)=>
{
    if(
        request.url ==='/user/login' ||
        request.url ==='/user/register'
    )
    {
        //skip verifying the token
        next()
    }
    else
    {
        const token=request.headers['token']

        if(!token || token.lenght===0)
        {
            response.send(util.createErrorResult('missing token'))
        }
        else
        {
            try
            {
                //verify the token
                const payload=jwt.verify(token,config.secret)
                request.userId=payload['id']

                next()

            }
            catch(ex)
            {
                response.send(util.createErrorResult('Invalid token'))
            }

        }
    }
}
)
app.use('/user',userrouter);
app.use('/property',propertyrouter);
app.use('/category',categoryrouter);
app.use('/bookings',bookingrouter);

app.listen(9999,()=>{console.log("Server started at 9999")});

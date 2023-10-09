const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();

const PUBLISHABLE_KEY="pk_test_51NypBZSDiIWuXuEIEzsStQDzVDbJz8AzgXSo2X3mES6XDrRVXiDdTM2Arn1jlYxsS94AWdS5SjBinZE3iBBmVEm100TBvieOBH"
const SECRET_KEY="sk_test_51NypBZSDiIWuXuEI7l88ZwxVklCPs8uCkIHQu4pbzstytllOQMG3zqwBXVPvsCbeOYMWqhPg5SQwrnnkJL9PIbhI00uh7FuEjb"

const stripe=require("stripe")(SECRET_KEY);

const PORT=process.env.PORT||3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())





app.set('view engine',"ejs");



app.get('/',(req,res)=>{
    res.render('Home',{
        key:PUBLISHABLE_KEY
    })
});

app.post('/payment',(req,res)=>{
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name:'ATHARVA MULAM ',
        address:{
            line1:'btm layout bangalore',
            postal_code:'560076',
            city:'Bangalore',
            state:'Karnataka',
            country:'India'

        }
    }).then((customer)=>{
        return stripe.charges.create({
            amount:10000,
            description:'testing developments',
            currency:'USD',
            customer:customer.id
        })
    }).then((charge)=>{
        console.log(charge)
        res.send("success")
    }).catch((error)=>{
        res.send(error)
    })

})


app.listen(PORT,()=>{
    console.log(`port is up and running on ${PORT}`);
})
const express=require("express");
const morgan=require("morgan");
const app=express();
const path=require("path");
const ProductRouter=require("./Routes/ProductRoute");
const UserRouter = require("./Routes/userRoutes")

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.use("/api/v1/products/",ProductRouter);
app.use('/api/v1/users', UserRouter);

module.exports=app;
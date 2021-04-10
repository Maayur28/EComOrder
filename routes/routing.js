const express = require('express');
const routes=express.Router();
const service=require('../services/user');
const auth=require('../utilities/auth');

routes.post('/order',auth,async(req,res,next)=>{
    req.body.userid=req.user.userid
    try {
        let orderItems=await service.addtoOrder(req.body);
        res.json({"order":orderItems}).status(200);
    } catch (error) {
        next(error);
    }
})
routes.get('/order',auth,async(req,res,next)=>{
    try {
        let orderDetail=await service.getfromOrder(req.user.userid);
        res.json({"orderDetail":orderDetail}).status(200);
    } catch (error) {
        next(error);
    }
})
module.exports=routes;
const startRouter=(req,res)=>{
    console.log(req.query.message)
    res.status(200).json({message:"şeyda"});
    if(req.query.message=="hayır"){
        console.log("kullanıcı hayır dedi")
    }
    else{
        console.log("kullanıcı saçmaladı :DD:D")
    }
}
module.exports ={
    startRouter
}
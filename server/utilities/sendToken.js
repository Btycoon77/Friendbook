// creating token and saving token in cookie;

const sendToken = (user,statusCode,res)=>{
    const token = user.getJwtToken();

    // options for cookie

    const options ={
        httpOnly:true,
        expires: new Date(Date.now()+5*86400*1000)
    };

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    });
}

export default sendToken;
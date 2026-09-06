const jwt = require("jsonwebtoken")

function authToken(req,res,next){
  try{
    const token= req.cookies.token
    if(!token){
      return res.status(401).json({
        message:"Please Login First"
      })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decoded;
    next();

  }catch(err){
    return res.status(401).json({
      message:"Invalid or expired token"
    })
  }
}
module.exports = {authToken};

// exports.Authtoken = async (req,res)=>{
//   try {
    
//   } catch (error) {
    
//   }
// }
import jwt from "jsonwebtoken";

const secretKey = "authentication";

export function auth(req,res,next){
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            msg : "Token is required"
        });
    }

    try{
        const decode = jwt.verify(token,secretKey);
        req.user = decode;
        next();
    }catch(err){
        return res.status(401).json({
            msg : "Invalid Token"
        });
    }
}

export{ secretKey }
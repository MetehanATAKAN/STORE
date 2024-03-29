import jwt from 'jsonwebtoken';

const verifyToken = async (req,res,next) => {
    const token = req.headers['authorization'];
    console.log(req.headers);
    if(!token) return res.status(403).json({error:'Token not provided'})

    jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=> {
        console.log(err);
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.decoded = decoded;
        next();
    })
}

export default verifyToken
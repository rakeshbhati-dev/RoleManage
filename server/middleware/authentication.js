const jwt=require('jsonwebtoken')
const User=require('../models/user.model')
const Role=require('../models/role.model')

const authenticate = async (req, res, next) => {
  const key=process.env.SECRET_KEY
  try {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, key);

    const user = await User.findByPk(decoded.userId, { include: Role });
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports=authenticate
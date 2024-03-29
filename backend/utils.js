import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXXX /// removes 'Bearer'
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) res.status(401).send({ message: 'Invalid Token' });
      else {
        req.user = decode;
        next();
      }
    });
  } else res.status(401).send({ message: 'No Token' });
};

const { Router } =  require('express');
const User = require('./models/User');
const jwt = require('jsonwebtoken')
const routes = new Router();

routes.get('/', (req, res)=> {
  return res.json({
    message: "Deu bom"
  })
});

routes.post('/users', async (req, res)=> {
  const user = await User.create(req.body);
  const {id, name, email } = user
  return res.json({id, name, email });
});

routes.post('/login', async (req, res)=> {
  const { email, password } = req.body;

  const userExist = await User.findOne({
    where: { email },
  });
  if(!userExist){
    return res.status(401).json({ error: 'User not found' });
  }
  if (!(await userExist.checkPassword(password))) {
    return res.status(401).json({ error: 'Password does not match' });
  }
  const { id, name } = userExist;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, "a611cd7a13c94591f49e3bb7b2b41f77", {
        expiresIn: "7d",
      }),
    });
});

module.exports = (routes);

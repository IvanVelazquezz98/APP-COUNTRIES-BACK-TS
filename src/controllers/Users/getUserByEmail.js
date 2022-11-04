const { User } = require("../../db");

async function getUserByEmail(req, res, next) {
  const { email } = req.params;
  try {
    
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if(user){
      res.status(200).send({existe:true,
      msg:'el usuario existe'});
     }else {
        res.status(200).send({existe:false,
        msg:'el usuario no existe'})
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getUserByEmail };

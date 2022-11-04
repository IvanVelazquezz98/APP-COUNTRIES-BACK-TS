const { Router } = require("express");

const {Activity,Country,User} = require('../db')
const router = Router();


router.get("/All", async(req , res)=>{
    const { id } = req.body;
    try {
      if (id) {
        const user = await User.findOne({
          where: {
            id,
          },
        });
        res.status(200).send(user);
      } else {
        const users = await User.findAll({
        });
        return res.status(200).send(users);
      }
    } catch (error) {
      next(error);
    }
  })

  router.get("/:email", async(req , res)=>{
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
  })

  router.get("/register", async(req , res)=>{
    try {
      const { email, name, password } = req.body;
      if (email && name && password) {
        const user = await User.findAll({
          where: { email: email },
        })
        
        if (user.length === 0) {
          const passwordHash = await encrypt(password);
          let user1 = await User.create({
            email,
            name,
            password: passwordHash,
            type: "User"
          });
  
          return res.status(200).send({ Msg: "Usuario creado con exito", /* completeUser */user1});
  
        } else {
          console.log("entro aqui (18)")
          return res.status(400).json({ msg: "este usuario ya se encuentra registrado" })
        }
  
      } else {
        console.log("entro aqui (23)")
        return res.status(400).json({ msj: "falta algun campo" })
      }
  
    } catch (error) {
      next(error);
    }
  })


  router.get("/login", async(req , res)=>{



    const { email, password } = req.body;
  
    try {
      if (email) {
        const user = await User.findOne({ where: { email } });
  
        if (!user) {
          return res.status(404).json("El usuario no existe");
        } else {
          const checkPassword = await compare(password, user.password);
          if (checkPassword) {
           
            const result = {
              checkpassword: checkPassword,
              userId: user.id,
              totalUser: user
            }
            return res.status(200).json(result);
  
          } else {
            return res.status(404).json("La contraseña no es correcta");
          }
        }
  
      } else {
        return res.status(404).json({ msg: "no hay email" });
  
      }
  
    } catch (err) {
      next(err);
    }
  })


module.exports = router;

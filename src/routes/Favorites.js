const { Router } = require('express');
const router = Router();
const {Favorites} = require('../db')





 
    router.post("/CreateFavorite", async (req  , res ) =>{
        try {
            const {
                name,
                flag,
                continent,
                capital,
                subregion,
                area,
                population,
                location,
                timezones,
                userId} = req.body
    
            const favoriteCreate = await Favorites.create({
                name,
                flag,
                continent,
                capital,
                subregion,
                area,
                population,
                location,
                timezones,
                userId : userId
            })
            if(favoriteCreate){
             res.status(200).send( {message:"favorite successfully created" , country:countryCreate})
            return
        }else{
            return res.status(400).send('fallo la creacion del favorito')
        }
           
        } catch (err) {
            return res.status(400).send('Error - Favorite not created')
        }

    })

    router.delete("/:id", async (req  , res ) => {
        try{
            let id = req.params.id

            await Favorites.destroy({
                where: {id:id}
            })
            res.status(200).send("Deleted favorite")

        } catch(err){
            res.status(404).send ("Could not delete the favorite")
        }
    })

    router.get("/user/:id", async(req , res)=>{
        const  id  = req.params.id;
        try {
          
            const favorites = await Favorites.findAll({
              where: {
                userId: id,
              },
            });
            if(favorites){
            res.status(200).send({existe:true,
            favorites: favorites});
           }else {
              res.status(400).send({existe:false,
              msg:'el usuario no tiene paises agregados a favoritos'})
          }
        } catch (error) {
          console.log(error)
        }
      })


    module.exports = router;
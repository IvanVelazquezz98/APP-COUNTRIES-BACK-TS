const { Router } = require('express');
const router = Router();
const {getAllCountries} = require('../controllers/getCountries');
const {Activity,Country,User} = require('../db')



router.get("/All", async(_req , res)=>{
    let allCountries = await getAllCountries()
   
     if(!allCountries){
        res.status(400).send("No Countries")
     }
        
     else {
        res.status(200).send(allCountries)
    }
    
})

router.get("/:name", async(req , res)=>{
        const name = req.params.name
        const allCountry = await getAllCountries()
            
        if(name){
            let country = allCountry.filter(c => c.name?.toLowerCase().includes(name.toString().toLowerCase()))
            if(country.length){
                res.status(200).send(country)
            } else {
             res.status(404).send("Country doesn't exist")  
            }
        }
    })
    

    router.get("/id/:id", async(req , res )=>{
           const id = req.params.id
           const allCountry = await getAllCountries()
               
           if(id){
               let country = allCountry.filter(c => c.id?.toLowerCase().includes(id.toString().toLowerCase()))
               if(country.length){
                   res.status(200).send(country)
               } else {
                res.status(404).send("Country doesn't exist")  
               }
           }
       })
 
    router.post("/CreateCountry", async (req  , res ) =>{
        try {
            const {id,
                name,
                flag,
                continent,
                capital,
                subregion,
                area,
                population,
                populationVirtual,
                unMember,
                location,
                timezones} = req.body
    
            const countryCreate = await model.Countries.create({
                id,
                name,
                flag,
                continent,
                capital,
                subregion,
                area,
                population,
                populationVirtual,
                unMember,
                location,
                timezones,
            })
             res.status(200).send( "Country successfully created")
           return await Promise.all(countryCreate)
           
        } catch (err) {
            return res.status(400).send('Error - Country not created')
        }

    })

    router.delete("/:id", async (req  , res ) => {
        try{
            let id = req.params.id

            await model.Countries.destroy({
                where: {id:id}
            })
            res.status(200).send("Deleted Country")

        } catch(err){
            res.status(404).send ("Could not delete the Country")
        }
    })

    router.get("/CreatedForUser", async(req , res)=>{
        const { id } = req.body;
        try {
          
            const countries = await Country.findOne({
              where: {
                userCountries: id,
              },
            });
            if(countries){
            res.status(200).send({existe:true,
            countries: countries});
           }else {
              res.status(400).send({existe:false,
              msg:'el usuario no tiene paises creados'})
          }
        } catch (error) {
          next(error);
        }
      })


    module.exports = router;
const { Router } = require('express');
const router = Router()
const {Activity,Country} = require('../db')



router.get("/", async (_req , res) =>{
    try{
        let ActivityDb = await Activity.findAll()
        return res.status(200).send(ActivityDb)   
    }
    catch(err){
        return res.status(400).send("No se encontro Actividad")
    }

})

router.post("/CreateActivity", async (req , res ) =>{
   try {
       const {id,
        name,
        difficulty,
        duration,
        season} = req.body

       const ActivityCreated = await Countries.create({
           id,
           name,
           difficulty,
           duration,
           season
       })

       await Promise.all(ActivityCreated)
        return res.status(200).send( "Activity successfully created")
   } catch (err) {
       return res.status(400).send('Error - Activity not created')
   }

})

router.delete("/:id", async (req , res ) => {
    try{
        let id = req.params.id

        await Activity.destroy({
            where: {id:id}
        })
        res.status(200).send("Deleted Activity")

    } catch(err){
        res.status(404).send ("Could not delete the Activity")
    }
})

module.exports = router;








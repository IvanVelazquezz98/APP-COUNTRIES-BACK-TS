const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriRoutes = require("./Country");
const activityRoutes = require("./Activity");
const usersRoute = require("./usersRoute")
const favorites = require("./Favorites")
const router = Router();



router.use('/api/countries' , countriRoutes)
router.use('/api/activity' , activityRoutes)
router.use('/api/users' , usersRoute)
router.use('/api/user/favorites' , favorites)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

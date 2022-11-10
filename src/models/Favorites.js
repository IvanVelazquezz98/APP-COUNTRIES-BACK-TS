const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('favorites', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    flag:{
      type: DataTypes.TEXT,
      defaultValue: "-",
      allowNull:false
    },
    continent:{
      type: DataTypes.STRING,
      defaultValue: "-",
      allowNull:false
    },
    capital:{
      type: DataTypes.STRING,
      defaultValue: "-",
      allowNull:false
    },
    subregion:{
      type: DataTypes.STRING,
      defaultValue: "-",

    },
    area:{
      type: DataTypes.STRING,
      
    },
    population:{
      type: DataTypes.STRING,
      defaultValue: "1",
    },
    location:{
        type: DataTypes.STRING,
        defaultValue: "-",
    },
    timezones:{
        type: DataTypes.STRING,
        defaultValue: "-",
    }
  },{timestamps:false});
};
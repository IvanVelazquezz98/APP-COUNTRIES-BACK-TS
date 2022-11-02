const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull:false
    },
    cName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull:false
    },
    continent:{
      type: DataTypes.STRING,
      allowNull:false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull:false
    },
    subregion:{
      type: DataTypes.STRING,

    },
    area:{
      type: DataTypes.FLOAT,
      get(){
        let dots= (number)=>{
           const thousands = /\B(?=(\d{3})+(?!\d))/g;
           return number.toString().replace(thousands, ".") 
       }
        //let value = this.getDataValue('population')
        return dots(this.getDataValue('area'))+' km2'
      }
    },
    population:{
      type: DataTypes.INTEGER,
     /*  get(){
        let dots= (number)=>{
           const thousands = /\B(?=(\d{3})+(?!\d))/g;
           return number.toString().replace(thousands, ".") 
       }
        //let value = this.getDataValue('population')
        return dots(this.getDataValue('population'))+' habitants'
        
      } */
    },
    populationVirtual:{
      type: DataTypes.VIRTUAL,
      get(){
        let dots= (number)=>{
           const thousands = /\B(?=(\d{3})+(?!\d))/g;
           return number.toString().replace(thousands, ".") 
       }
        //let value = this.getDataValue('population')
        return dots(this.population)+' habitants'
        
      }
    },
    unMember:{
        type:DataTypes.STRING,
    },
    location:{
        type: DataTypes.STRING
    },
    timezones:{
        type: DataTypes.STRING
    }
  },{timestamps:false});
};
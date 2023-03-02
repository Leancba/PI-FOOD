const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'No hay pasos',
    },
    
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    
  },
  {
    timestamps: false
  })};
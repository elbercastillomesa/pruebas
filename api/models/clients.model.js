const { DataTypes } = require('sequelize');
const sequelize = require('../config.db');

const Clients = sequelize.define('Clients', {
  identificacion: {
    allowNull: false,    
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoIdentificacion: {
    type: DataTypes.INTEGER,
  },
  fechaNacimiento : {
    type: DataTypes.DATE,
  },
  numeroCelular: {
    type: DataTypes.TEXT,
  },
  correoElectronico: {
    type: DataTypes.TEXT,
  },
});

Clients.sync().then(
  () => {
    console.log('Clients table is available.');
  }
).catch(
  (error) => {
    console.error('Unable to access table : ', error.message);
  }
)

module.exports = Clients;
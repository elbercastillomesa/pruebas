const { DataTypes } = require('sequelize');
const sequelize = require('../config.db');

// Import table relationships
const Clients = require('./clients.model');

const Services = sequelize.define('Services', {
  identificacion: {
    allowNull: false,    
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ultimaFacturacion : {
    type: DataTypes.DATE,
  },
  ultimoPago : {
    type: DataTypes.DATE,
  },
  fechaInicio : {
    type: DataTypes.DATE,
  },
  servicio: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
});

Services.belongsTo(Clients, { foreignKey: 'identificacion' });

Services.sync().then(
  () => {
    console.log('Services table is available.');
  }
).catch(
  (error) => {
    console.error('Unable to access table : ', error.message);
  }
)

module.exports = Services;
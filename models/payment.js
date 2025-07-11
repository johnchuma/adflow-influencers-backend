'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Campaign)
    }
  }
  Payment.init({
   id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      status:{
        type: DataTypes.ENUM("PENDING","COMPLETED"),
        defaultValue:"PENDING"
      },
      campaignId:{
        type: DataTypes.UUID,
        allowNull:false
      },
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
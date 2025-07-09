'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClientDetail.belongsTo(models.User)
    }
  }
  ClientDetail.init({
       id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: true,
      },
       company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       profileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      minBudget:{
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
       maxBudget:{
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
  }, {
    sequelize,
    modelName: 'ClientDetail',
  });
  return ClientDetail;
};
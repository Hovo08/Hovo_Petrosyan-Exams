const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql.js");
const User = require("./userModels.js");

const Event = sequelize.define(
  "Event",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Events",
    timestamps: true, 
  }
);

User.hasMany(Event);
Event.belongsTo(User);

module.exports = Event;

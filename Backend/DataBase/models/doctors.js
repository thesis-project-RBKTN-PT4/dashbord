const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctors', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "doctors_ibfk_1"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    specialization: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    about: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    x_coordinate: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: true
    },
    y_coordinate: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: true
    },
    picture: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'doctors',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

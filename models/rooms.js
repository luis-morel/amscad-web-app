// Rooms model
module.exports = function (sequelize, DataTypes) {

    // Rooms table definition
    var Rooms = sequelize.define("Rooms", {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }); // End of Rooms table definition

    // Adding Floors table foreign key
    Rooms.associate = function (models) {
        Rooms.belongsTo(models.Floors, { foreignKey: { allowNull: false }});
    }

    return Rooms;

}; // End of Rooms model
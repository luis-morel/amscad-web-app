// Floors model
module.exports = function (sequelize, DataTypes) {

    // Floors table definition
    var Floors = sequelize.define("Floors", {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }); // End of Floors table definition

    // Adding Buildings table foreign key
    Floors.associate = function (models) {
        Floors.belongsTo(models.Buildings, { foreignKey: { allowNull: false }});
    }

    // Setting up one-to-many Floors-to-Rooms association
    Floors.associate = function (models) {
        Floors.hasMany(models.Rooms, { onDelete: "CASCADE", hooks: true });
    }

    return Floors;

}; // End of Floors model
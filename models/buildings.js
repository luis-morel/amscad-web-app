// Buildings model
module.exports = function (sequelize, DataTypes) {

    // Buildings table definition
    var Buildings = sequelize.define("Buildings", {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }); // End of Buildings table definition

    // Setting up one-to-many Buildings-to-Floors association
    Buildings.associate = function (models) {
        Buildings.hasMany(models.Floors, { onDelete: "CASCADE", hooks: true });
    }

    return Buildings;

}; // End of Buildings model
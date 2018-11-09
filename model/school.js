'use strict'
module.exports = function (sequelize, DataTypes) {

    var School = sequelize.define(
        'school',
        {
            id: {
                field: 'id',
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: DataTypes.STRING,
                allowNull: false
            },
            page: {
                field: 'page',
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'school',
            timestamps: false,
            freezeTableName: true
        }
    );
    return School;
};
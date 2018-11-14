'use strict'
module.exports = function (sequelize, DataTypes) {

    var newplan = sequelize.define(
        'newplan',
        {
            id: {
                field: 'id',
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            schoolName: {
                field: 'schoolName',
                type: DataTypes.STRING,
                allowNull: true
            },
            schoolId: {
                field: 'schoolId',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            provName: {
                field: 'provName',
                type: DataTypes.STRING,
                allowNull: true
            },
            provId: {
                field: 'provId',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isHave: {
                field: 'isHave',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            htmlData: {
                field: 'htmlData',
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'newplan',
            timestamps: false,
            freezeTableName: true
        }
    );
    return newplan;
};
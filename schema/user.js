'use strict'
module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define(
        'user',
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
            typeId: {
                field: 'typeId',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            year: {
                field: 'year',
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
            tableName: 'user',
            timestamps: false,
            freezeTableName: true
        }
    );
    return User;
};
'use strict'
module.exports = function (sequelize, DataTypes) {

    var PFractionData = sequelize.define(
        'pfractionData',
        {
            id: {
                field: 'id',
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            schoolId: {
                field: 'schoolId',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            schoolName: {
                field: 'schoolName',
                type: DataTypes.STRING,
                allowNull: true
            },
            provId: {
                field: 'provId',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            provName: {
                field: 'provName',
                type: DataTypes.STRING,
                allowNull: true
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
            code: {
                field: 'code',
                type: DataTypes.INTEGER,
                allowNull: true
            },
            majorName: {
                field: 'majorName',
                type: DataTypes.STRING,
                allowNull: true
            },
            bat: {
                field: 'bat',
                type: DataTypes.STRING,
                allowNull: true
            },
            max: {
                field: 'max',
                type: DataTypes.STRING,
                allowNull: true
            },
            avr: {
                field: 'avr',
                type: DataTypes.STRING,
                allowNull: true
            },
            min: {
                field: 'min',
                type: DataTypes.STRING,
                allowNull: true
            },
            minLevel: {
                field: 'minLevel',
                type: DataTypes.STRING,
                allowNull: true
            },
            count: {
                field: 'count',
                type: DataTypes.STRING,
                allowNull: true
            },
            dataCount: {
                field: 'dataCount',
                type: DataTypes.INTEGER,
                allowNull: true
            },
            dataFromId: {
                field: 'dataFromId',
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            tableName: 'pfractionData',
            timestamps: false,
            freezeTableName: true
        }
    );
    return PFractionData;
};
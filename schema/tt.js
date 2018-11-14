'use strict'
module.exports = function (sequelize, DataTypes) {

    var TT = sequelize.define(
        'tt',
        {
            id: {
                field: 'id',
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            pt: {
                field: 'pt',
                type: DataTypes.STRING,
                allowNull: true
            },
            name: {
                field: 'name',
                type: DataTypes.STRING,
                allowNull: true
            },
            url: {
                field: 'url',
                type: DataTypes.STRING,
                allowNull: true
            },
            keyword: {
                field: 'keyword',
                type: DataTypes.STRING,
                allowNull: true
            },
            cpname: {
                field: 'cpname',
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            tableName: 'tt',
            timestamps: false,
            freezeTableName: true
        }
    );
    return TT;
};
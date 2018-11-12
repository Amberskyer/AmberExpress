'use strict'
module.exports = function (sequelize, DataTypes) {

    var PFractionDLC = sequelize.define(
        'pfractionDLC',
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
            },
            isDLC: {
                field: 'isDLC',
                type: DataTypes.INTEGER,
                allowNull: true
            },
            isCheck: {
                field: 'isCheck',
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'pfractionDLC',
            timestamps: false,
            freezeTableName: true
        }
    );
    return PFractionDLC;
};
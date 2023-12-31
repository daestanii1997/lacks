const {Model, DataTypes}=require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {

}

Comment.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        comment_content:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        parent_post:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'comment',
                key:'id'
            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
            }
        },
        created_on:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:'comment'
    }
);

module.exports = Comment;
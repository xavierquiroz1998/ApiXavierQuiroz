
'use strict';
var __importDefault = (this, this.__importDefault)|| function(mod){
    return (mod && mod.__esModule) ? mod : {"default": mod};
};

Object.defineProperty(exports,"__esModule",{value : true});
const sequalize_1 = require('sequelize');
const connection_1 = __importDefault(require('../pg'));

const usuarios = connection_1.default.define('usuarios',{
    id:{
        type: int
    },
    nombre:{
        type: String,
    },
    cedula:{
        type: String,
    }
},{
    freezeTableName: true,
    timestamps: false
}
);

exports.default = usuarios;


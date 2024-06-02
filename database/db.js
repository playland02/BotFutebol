import {Sequelize} from 'sequelize'


export const sequelize = new Sequelize("greenfut","root","12345678",{
    host:'localhost',
    dialect:'mysql'
})



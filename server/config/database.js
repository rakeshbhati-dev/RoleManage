const {Sequelize}=require('sequelize')

const database=process.env.DATABASE_NAME
const username=process.env.DATABASE_USER
const password=process.env.DATABASE_PASSWORD
const sequelize=new Sequelize(database,username,password,{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports=sequelize
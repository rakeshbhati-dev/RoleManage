const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app=express()
app.use(express.json())
const sequelize=require('./config/database')
const initializeAdmin=require('./seed/admin.seed')
const initializeModule=require('./seed/module.seed')
const cors=require('cors')
app.use(cors())

const userRouter=require('./routes/user.route')
const roleRouter=require('./routes/role.route')
const enterpriseRouter=require('./routes/enterprise.route')
const employeeRouter=require('./routes/employee.route')
const productRouter=require('./routes/product.route')
const permissionRouter=require('./routes/permission.route')
const moduleRouter=require('./routes/module.route')

app.use('/user',userRouter)
app.use('/role',roleRouter)
app.use('/enterprise',enterpriseRouter)
app.use('/employee',employeeRouter)
app.use('/product',productRouter)
app.use('/permission',permissionRouter)
app.use('/module',moduleRouter)

const port=process.env.PORT
async function startServer() {
  try {
    await sequelize.sync();
    await initializeModule();
    await initializeAdmin();
    console.log('Database synced successfully');
    app.listen(port, () => console.log(`Server started`));
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

startServer()
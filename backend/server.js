import express from 'express'
// cors allows you to make connections b/w front end and backend even they are on different domains or ports
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectClodinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
// app config
const app=express()
const port=process.env.port || 4000
connectDB()
connectClodinary()
// middlewares
app.use(express.json())
app.use(cors())

// api endpoints

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
// localhost:4000/api/admin/add-doctor
app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port,()=>console.log("server started",port))



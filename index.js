import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import bookingapi from './routes/bookingapi.js'
import userapi from './routes/userapi.js'
import adminapi from './routes/adminapi.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

mongoose.connect(process.env.url,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open',() => console.log('database connected'));

app.use(bodyParser.json())
app.use(cors())
app.use('/api',bookingapi)
app.use('/user',userapi)
app.use('/admin',adminapi)
app.get('/',(req, res) => {
    res.send('Route is perfect')
})
app.all('*', (req, res) => {
    res.send('Error 404 Page not found')
})

app.listen(port, () => {console.log(`http://localhost:${port}`)})
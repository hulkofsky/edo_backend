const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const postgres = require('pg')
const port = 3000
const router = express.Router()
const projectRouter = require('./routes/homeRoutes')

//morgan init
app.use(morgan('dev'))

//bodyparser init
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', projectRouter);

app.get('*', (req,res)=>{
    res.send('Oo oops!!')
})

app.listen(port, err=>{
    err?console.log('Oo oops! Something went wrong!'):
        console.log(`Server is running on ${port}`)
})
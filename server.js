const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = 3000
const homeRouter = require('./routes/homeRoutes')
const authRouter = require('./routes/authRoutes')

//morgan init
app.use(morgan('dev'))

//bodyparser init
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', homeRouter)
app.use('/', authRouter)

app.get('*', (req,res)=>{
    res.send('Oo oops!!')
})

app.listen(port, err=>{
    err?console.log('Oo oops! Something went wrong!'):
        console.log(`Server is running on ${port}`)
})
const express = require('express')
const mongo = require('mongoose')

const PORT =process.env.PORT||5000
// const authRouter = require('./auth/authRouter')

const { urlForConnect } = require('./config')




const cors = require('cors')
const app = express()
const siteOrdersRouetr =require('./routers/SiteOrdersRouter')
const usersRouter =require('./routers/usersRouter')
const transactionsRouter=require('./routers/transactionsRouter')
const authRouter=require('./routers/authRouter')
// отключаем верифкацию при запросах из серевера в бибилиотеке requests
mongo.set('strictQuery', false)//эта строка убирает предупреждения с консоли
app.use(cors())

app.use(express.json())
app.use('/orders', siteOrdersRouetr)
app.use('/users', usersRouter)
app.use('/transactions', transactionsRouter)
app.use('/auth', authRouter)



const start = async () => {
    try {
        await mongo.connect(urlForConnect)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}
start()
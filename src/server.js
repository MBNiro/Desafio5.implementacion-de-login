import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { __dirname } from './utils.js'
import usersRouter from './routes/users.router.js'
import './db/dbConfig.js'
import mongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'

import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import productRouter from "./routes/products.router.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(errorHandler);
app.use(morgan("dev"));

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

app.use(
    session({
      secret: 'sessionKey',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 10000
      },
      store: new mongoStore({
        mongoUrl: '"mongodb://maria:muD3iMBZz7IPpxu6@cluster23.c2zreja.mongodb.net/ecommerce"',
        ttl: 10,
      }),
    })
  )

app.use('/users',usersRouter,)
app.use('/views',viewsRouter)
app.use("/products", productRouter);


const PORT = 8080
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})
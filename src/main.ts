import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import routes from './routes'
import { createChatServer } from './socket/chat'
import { AppDataSource } from './data-source'
import { errorHandler } from './middlewares/errorHandler'

const PORT = process.env.NODE_LOCAL_PORT

AppDataSource.initialize()
  .then(async () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.static('public'))
    app.use(routes)
    app.use(errorHandler)

    const server = createServer(app)

    createChatServer(server).listen()

    server.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`)
    })
  })
  .catch((error) => console.log(error))

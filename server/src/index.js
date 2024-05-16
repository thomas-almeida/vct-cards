import api from './routes.js'

import express from 'express'
import cors from 'cors'

const app = express()
const port = 3002

app.use(express.json())
app.use(cors())
app.use(api)

app.listen(port, () => {
    console.log(`VUT running on ${port}`)
})
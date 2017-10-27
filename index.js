import express from 'express'
import path from 'path'
import process from 'process'

const app = express()
app.set('port', process.env.PORT || 8080)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => console.log('express is listening...'))

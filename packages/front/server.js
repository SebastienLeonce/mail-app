const express = require('express')
const path = require('path')
const dotenv = require('dotenv');

dotenv.config();

const app = express()
const port = process.env.PORT || 3001

const viewsDir = path.join(__dirname, './dist')
const staticDir = path.join(__dirname, './dist');

app.set('views', viewsDir);
app.use(express.static(staticDir));

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: viewsDir})
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
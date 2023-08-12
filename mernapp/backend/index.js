const express = require('express')
const app = express()
const port = 5000
const mongodb = require('./db')


// // middleware  code (write as it is)
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// })

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send(' Kaise h aap log...')
})

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
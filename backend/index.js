const connectToMongo =  require('./db')
const express = require('express')
const cors = require('cors')


const app = express()
const port = 4000

//Connect to mongoDB
connectToMongo();

app.use(cors())
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Avilabel All Routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))

app.listen(port, () => {
  console.log(`\n\inootbook app listening on port ${port}`)
})

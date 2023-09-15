const express = require('express');
const app = express();
const db = require('./db');
const PORT = 3001;
const api = require('./routes');
const bodyParser = require('body-parser') 

app.use(bodyParser.json({limit: '1gb'}));
app.use('/api',api);
app.listen(PORT, () => {
    console.log(`Server started in the port: ${PORT}`);
})


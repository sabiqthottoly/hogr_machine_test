const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hogr',{
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB CONNECTION OK")
    })
    .catch(err => {
        console.log("DB CONNECTION IS BAD")
        console.log(err)
    });
var crypto = require('crypto');
const users = require('./model');
const moment = require('moment');
const SECRET_PASSWORD = 'mypassword'

const createUser = async (userName, password) => {
    // hash password and store it
    let mykey = crypto.createCipher('aes-128-cbc', SECRET_PASSWORD);
    let hasedPassword = mykey.update(password, 'utf8', 'hex')
    hasedPassword += mykey.final('hex');
    await users.collection.insertOne({ userName, password: hasedPassword, coins: 0, lastLoggedinDate: new Date(), streak: 0 });
}

const loginUser = async (userName, password) => {
    // decrept password and match it
    const userDetails = await users.collection.findOne({ userName });
    var mykey = crypto.createDecipher('aes-128-cbc', SECRET_PASSWORD);
    var decodedPassword = mykey.update(userDetails.password, 'hex', 'utf8')
    decodedPassword += mykey.final('utf8');
    if (decodedPassword !== password) {
        throw new Error("User password is wrong");
    }

    // find the difference between last loggedIn time and today
    const userLoggedInDate = moment(userDetails.lastLoggedinDate);
    const currentDate = moment(new Date());
    const days = currentDate.diff(userLoggedInDate, 'days') 
    // update the coins if user logged with in consicutive day
    let updateCoin = { coins: userDetails.coins + ((userDetails.streak + 1) * 10), lastLoggedinDate: new Date(), streak: userDetails.streak + 1 }
    // update nothing if user login with in same day
    if (days === 0 && userDetails.coins !== 0) { 
        return
    }
    // reset streak if user misses a day to log in
    if (days > 1) {
        updateCoin = { coins: userDetails.coins + 10, lastLoggedinDate: new Date(), streak: 0 }
    }

    await users.updateOne({ userName: userName }, updateCoin, { upsert: true });
}

module.exports = { createUser, loginUser };
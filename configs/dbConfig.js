const dotenv = require('dotenv')
dotenv.config()
const dbConnect = () => {
try {
const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/vishnupriya');
mongoose.connect(process.env.MONGO_URI);
console.log("Successfully! Connected to DB")
} catch (error) {
    console.log(error," Error When connecting to the Database!")
}

}

module.exports = dbConnect
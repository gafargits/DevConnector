const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');;

const app = express();

//DB Config
const db =  require('./config/keys').mongoURI;

//connect to mongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => {
        return console.log('mongoDB connected')
    })
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    return res.send('hello world again!');
});

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    return console.log(`Server running on port ${port}`)
})
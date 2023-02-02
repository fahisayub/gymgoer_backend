const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const { connectdb } = require('./config/db.config');
const { userRouter } = require('./routes/user.route');
const { oauthRouter } = require('./routes/oauth.route');
const { profileRouter } = require('./routes/profile.route');
const { logRouter } = require('./routes/logs.route');
const app = express();


app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/entrylogs', logRouter);
app.use('/', (req, res) => {
    res.send('Home page');
});
// app.use('/auth',oauthRouter);
// app.get('/auth/google',
// );

// app.get('/auth/google/callback',
// );

app.listen(port, async () => {
    try {
        await connectdb;
        console.log('Connected to MongoDB Atlas');

    } catch (e) {
        console.log(404, 'Error connecting to MongoDB Atlas');

    }
    console.log(`Listening on port ${port}`);

})
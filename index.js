const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
const { connectdb } = require('./config/db.config');
const { userRouter } = require('./routes/user.route');
const app = express();
const { oauthRouter } = require('./routes/oauth.route');


app.use(express.json());
app.use(cors());

// app.use('/auth',oauthRouter);
app.use('/user', userRouter);

// app.get('/auth/google',
// );

// app.get('/auth/google/callback',
// );
app.use('/', (req, res) => {
    res.send('Home page');
});

app.listen(port, async () => {
    try {
        await connectdb;
        console.log('Connected to MongoDB Atlas');

    } catch (e) {
        console.log(404, 'Error connecting to MongoDB Atlas');

    }
    console.log(`Listening on port ${port}`);

})
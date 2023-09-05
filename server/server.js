const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const createRouterUsers = require('./helpers/create_router_users.js');
const createRouterStocks = require('./helpers/create_router_stocks.js');

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
    .then((client) => {
        const db = client.db('stocks_app_database');
        const usersCollection = db.collection('users');
        const stocksCollection = db.Collection('stocks');
        const usersRouter = createRouterUsers(usersCollection);
        const stocksRouter = createRouterStocks(stocksCollection);
        app.use('/api/users', usersRouter);
        app.use('/api/stocks', stocksRouter);
    })
    .catch(console.err);

app.listen(9000, function () {
    console.log(`Listening on port ${this.address().port}`);
});

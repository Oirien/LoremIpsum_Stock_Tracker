use stocks_app_database;
db.users.drop();

db.users.insertOne({
    username: 'big_jimmy',
    wallet: 20000,
    lifetime_spend: 2000,
    lifetime_profit: 0,
    stocks: [
        {
            symbol: '0A17',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: '0A1J',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: '0A1O',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
    ],
});

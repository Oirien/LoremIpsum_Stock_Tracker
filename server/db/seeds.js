use stocks_app_database;
db.users.drop();

db.users.insertOne({
    username: 'big_jimmy',
    email:"slim_jim1973@yahoo.com",
    billing_address: "92 Cramond Road, Edinburgh",
    phone: "07455555555",
    wallet: 20000,
    lifetime_spend: 19000,
    lifetime_profit: 0,
    stocks: [
        {
            symbol: 'AAPL',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: 'MSFT',
            number_of_stocks_owned: 10,
            amount_spent: 2000,
        },
        {
            symbol: 'GOOGL',
            number_of_stocks_owned: 5,
            amount_spent: 4000,
        },
        {
            symbol: 'META',
            number_of_stocks_owned: 20,
            amount_spent: 5000,
        },
        {
            symbol: 'AMZN',
            number_of_stocks_owned: 3,
            amount_spent: 560,
        },
        {
            symbol: 'NVDA',
            number_of_stocks_owned: 6,
            amount_spent: 2200,
        },
        {
            symbol: 'CF',
            number_of_stocks_owned: 30,
            amount_spent: 1200,
        },
        {
            symbol: 'CIA',
            number_of_stocks_owned: 10,
            amount_spent: 2000,
        },
    ],
});

use stocks_app_database;
db.users.drop();

db.users.insertOne({
    username: 'big_jimmy',
    email:"slim_jim1973@yahoo.com",
    billing_address: "92 Cramond Road, Edinburgh",
    phone: "07455555555",
    wallet: 20000,
    lifetime_spend: 2000,
    lifetime_profit: 0,
    stocks: [
        {
            symbol: 'AA',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: 'AAC',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'AAIC',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
        {
            symbol: 'AAMC',
            number_of_stocks_owned: 20,
            amount_spent: 300,
        },
        {
            symbol: 'BC',
            number_of_stocks_owned: 3,
            amount_spent: 1200,
        },
        {
            symbol: 'BLCO',
            number_of_stocks_owned: 6,
            amount_spent: 200,
        },
        {
            symbol: 'CF',
            number_of_stocks_owned: 30,
            amount_spent: 100,
        },
        {
            symbol: 'CIA',
            number_of_stocks_owned: 10,
            amount_spent: 600,
        },
    ],
});

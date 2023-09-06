use stocks_app_database;
db.users.drop();

db.users.insertOne({
    username: 'big_jimmy',
    wallet: 20000,
    lifetime_spend: 2000,
    lifetime_profit: 0,
    stocks: [
        {
            symbol: 'MEC',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: 'MHK',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'FNV',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
        {
            symbol: 'MEC',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: 'MHK',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'FNV',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
        {
            symbol: 'MEC',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: 'MHK',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'FNV',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
        {
            symbol: 'MEC',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: 'MHK',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'FNV',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
        {
            symbol: 'MEC',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: 'MHK',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'FNV',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
        {
            symbol: 'MEC',
            number_of_stocks_owned: 20,
            amount_spent: 2000,
        },
        {
            symbol: 'MHK',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'FNV',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        }
    ],
});

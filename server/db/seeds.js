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
            symbol: 'ACB',
            number_of_stocks_owned: 20,
            amount_spent: 300,
        },
        {
            symbol: 'ACC',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'ACD',
            number_of_stocks_owned: 3,
            amount_spent: 1200,
        },
        {
            symbol: 'ACE',
            number_of_stocks_owned: 22,
            amount_spent: 200,
        },
        {
            symbol: 'ACF',
            number_of_stocks_owned: 10,
            amount_spent: 400,
        },
        {
            symbol: 'CDX',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
        {
            symbol: 'CQL',
            number_of_stocks_owned: 10,
            amount_spent: 1000, 
        },
        {
            symbol: 'MHK',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'CQM',
            number_of_stocks_owned: 6,
            amount_spent: 200,
        },
        {
            symbol: 'CUN',
            number_of_stocks_owned: 30,
            amount_spent: 100,
        },
        {
            symbol: 'DTK',
            number_of_stocks_owned: 30,
            amount_spent: 600,
        },
        {
            symbol: 'DUI',
            number_of_stocks_owned: 50,
            amount_spent: 200,
        },
        {
            symbol: 'DVA',
            number_of_stocks_owned: 10,
            amount_spent: 600,
        },
        {
            symbol: 'DWL',
            number_of_stocks_owned: 80,
            amount_spent: 7000,
        },
        {
            symbol: 'EEE',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        },
        {
            symbol: 'EEI',
            number_of_stocks_owned: 10,
            amount_spent: 700,
        },
        {
            symbol: 'EFW',
            number_of_stocks_owned: 5,
            amount_spent: 1200,
        }
    ],
});

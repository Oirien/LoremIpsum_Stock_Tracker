use stocks_app_database;
db.dropDatabase();

db.users.insertOne({
    username: "big_jimmy",
    wallet: 20000,
    lifetime_spend: 2000,
    lifetime_profit: 0,
    stocks: [
        {
            symbol: "AABA",
            number_of_stocks_owned: 20,
            amount_spent: 2000
        }
    ]
}
);

import React from 'react';
import { useState } from 'react';

function StockBuySell({ stockIndividualData, userData, queryClient }) {
    const [stocksBought, setStocksBought] = useState('');
    const [stocksSold, setStocksSold] = useState('');

    const handleBuyStocks = (e) => {
        e.preventDefault();

        const stockSymbol = stockIndividualData.symbol;

        const previousStocksAmount = Number(
            userData[0].stocks
                .filter((stock) => stock.symbol === stockIndividualData.symbol)
                .map((stocks_number) => stocks_number.number_of_stocks_owned),
        );
        const newAmountOfStocks = stocksBought + previousStocksAmount;

        const newAmountSpentForStock = Math.round(
            stocksBought * stockIndividualData.close +
                Number(
                    userData[0].stocks
                        .filter(
                            (stock) =>
                                stock.symbol === stockIndividualData.symbol,
                        )
                        .map((amount) => amount.amount_spent),
                ),
        );

        const newStockData = {
            symbol: stockSymbol,
            number_of_stocks_owned: newAmountOfStocks,
            amount_spent: newAmountSpentForStock,
        };

        const newStocks = [
            ...userData[0].stocks.filter(
                (stock) => stock.symbol !== stockSymbol,
            ),
            newStockData,
        ];

        const newLifeTimeSpend = Math.round(
            stocksBought * stockIndividualData.close +
                userData[0].lifetime_spend,
        );

        const newWallet = Math.round(
            userData[0].wallet - stocksBought * stockIndividualData.close,
        );

        const config = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stocks: newStocks,
                lifetime_spend: newLifeTimeSpend,
                wallet: newWallet,
            }),
        };

        console.log(newStocks);
        fetch(`http://localhost:9000/api/users/${userData[0]._id}`, config)
            .then((res) => res.json())
            .then((data) => queryClient.invalidateQueries('users'));

        setStocksBought('');
    };

    const handleSellStocks = (e) => {
        e.preventDefault();

        const stockSymbol = stockIndividualData.symbol;

        const previousStocksAmount = Number(
            userData[0].stocks
                .filter((stock) => stock.symbol === stockIndividualData.symbol)
                .map((stocks_number) => stocks_number.number_of_stocks_owned),
        );
        const newAmountOfStocks = previousStocksAmount - stocksSold;

        const newAmountSpentForStock = Math.round(
            Number(
                userData[0].stocks
                    .filter(
                        (stock) => stock.symbol === stockIndividualData.symbol,
                    )
                    .map((amount) => amount.amount_spent),
            ) -
                stocksSold * stockIndividualData.close,
        );

        const newLifeTimeSpend = Math.round(
            Number(
                userData[0].lifetime_spend -
                    stocksSold * stockIndividualData.close,
            ),
        );

        const newWallet = Math.round(
            Number(userData[0].wallet + stocksSold * stockIndividualData.close),
        );

        if (newAmountOfStocks > 0) {
            const newStockData = {
                symbol: stockSymbol,
                number_of_stocks_owned: newAmountOfStocks,
                amount_spent: newAmountSpentForStock,
            };

            const newStocks = [
                ...userData[0].stocks.filter(
                    (stock) => stock.symbol !== stockSymbol,
                ),
                newStockData,
            ];

            const config = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stocks: newStocks,
                    lifetime_spend: newLifeTimeSpend,
                    wallet: newWallet,
                }),
            };
            fetch(`http://localhost:9000/api/users/${userData[0]._id}`, config)
                .then((res) => res.json())
                .then((data) => queryClient.invalidateQueries('users'));
        } else {
            const newStocks = [
                ...userData[0].stocks.filter(
                    (stock) => stock.symbol !== stockSymbol,
                ),
            ];
            const config = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stocks: newStocks,
                    lifetime_spend: newLifeTimeSpend,
                    wallet: newWallet,
                }),
            };
            fetch(`http://localhost:9000/api/users/${userData[0]._id}`, config)
                .then((res) => res.json())
                .then((data) => queryClient.invalidateQueries('users'));
        }

        console.log(newAmountSpentForStock);

        setStocksSold('');
    };
    const maxSell = userData[0].stocks
        .filter((stock) => stock.symbol === stockIndividualData.symbol)
        .map((y) => y.number_of_stocks_owned);
    const maxBuy = Math.floor(
        userData[0].wallet / Number(stockIndividualData.close),
    );
    return (
        <div>
            <div>
                <p>Current Price: {stockIndividualData.close}$</p>
                {maxBuy >= 1 ? (
                    <div>
                        <form onSubmit={handleBuyStocks}>
                            <input
                                type="number"
                                name="buy-stock"
                                id="buy-stock"
                                style={{ minWidth: '50px' }}
                                min={0}
                                max={maxBuy}
                                required
                                value={stocksBought}
                                onChange={(e) =>
                                    setStocksBought(Number(e.target.value))
                                }
                            />
                            <button>Buy</button>
                        </form>
                    </div>
                ) : (
                    <>
                        <h3>Not Enough Money</h3>
                    </>
                )}

                {maxSell > 0 && (
                    <>
                        <div>
                            <form onSubmit={handleSellStocks}>
                                <input
                                    type="number"
                                    name="sell-stock"
                                    id="sell-stock"
                                    style={{ minWidth: '50px' }}
                                    min={0}
                                    max={maxSell}
                                    required
                                    value={stocksSold}
                                    onChange={(e) =>
                                        setStocksSold(Number(e.target.value))
                                    }
                                />
                                <button>Sell</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default StockBuySell;

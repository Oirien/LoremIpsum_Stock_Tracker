import React from 'react';
import { useState } from 'react';
import {
    BuySellWrapper,
    CurrentPrice,
    InputNumber,
    BuySellButton,
} from './Styles/StockBuySellStyles';

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
        <BuySellWrapper>
            <CurrentPrice>
                Current Price per Unit:
                <br />${stockIndividualData.close}
            </CurrentPrice>
            <div>
                {maxBuy >= 1 ? (
                    <div>
                        <form onSubmit={handleBuyStocks}>
                            <InputNumber
                                type="number"
                                name="buy-stock"
                                id="buy-stock"
                                min={0}
                                max={maxBuy}
                                required
                                value={stocksBought}
                                onChange={(e) =>
                                    setStocksBought(Number(e.target.value))
                                }
                            />
                            <BuySellButton>Buy</BuySellButton>
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
                                <InputNumber
                                    type="number"
                                    name="sell-stock"
                                    id="sell-stock"
                                    min={0}
                                    max={maxSell}
                                    required
                                    value={stocksSold}
                                    placeholder={`Max: ${maxSell}`}
                                    onChange={(e) =>
                                        setStocksSold(Number(e.target.value))
                                    }
                                />
                                <BuySellButton>Sell</BuySellButton>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </BuySellWrapper>
    );
}

export default StockBuySell;

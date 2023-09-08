import React from 'react';

function StockBuySell({
    stockIndividualData,
    handleBuyStocks,
    handleSellStocks,
    stocksBought,
    stocksSold,
    setStocksBought,
    setStocksSold,
    userData,
}) {
    const maxSell = userData[0].stocks
        .filter((stock) => stock.symbol === stockIndividualData.symbol)
        .map((y) => y.number_of_stocks_owned);
    const maxBuy = Math.floor(
        userData[0].wallet / Number(stockIndividualData.close),
    );
    return (
        <div>
            <span>Current Price: {stockIndividualData.close}$</span>
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
    );
}

export default StockBuySell;

import React from 'react'
import styled from "styled-components"

const StocksWrapper = styled.div`
border: 1px solid red;
display: flex;
gap:30px;
min-height: 50vh;
`;

const StockInformation = styled.div`
    border:3px solid yellow;
    max-width: 20%;
    padding: 4px 8px;
    display: flex;
    flex-flow: column wrap;
    gap: 15px;
    align-items: flex-start;
    
`;

const GraphSection = styled.div`
    border:2px solid green;
    flex:1;
`;

const SpanStyle = styled.span`
    display: flex;
    flex-flow: column;
`;


function Stock() {

    const stock = {
        "symbol": "020Y",
        "name": "iShares IV Public Limited Company - iShares Euro Government Bond 20yr Target Duration UCITS ETF",
        "currency": "EUR",
        "exchange": "LSE",
        "mic_code": "XLON",
        "country": "United Kingdom",
        "type": "Common Stock"
      }
    
  return (
    <>   
    <StocksWrapper>
        <StockInformation>
            
            <SpanStyle><span>Name:</span>{stock.name}</SpanStyle>
            <SpanStyle><span>Symbol:</span>{stock.symbol}</SpanStyle>   
            <SpanStyle><span>Currency: </span>{stock.currency}</SpanStyle>
            <SpanStyle><span>Exchange: </span>{stock.exchange}</SpanStyle>
            <SpanStyle><span>Country: </span>{stock.country}</SpanStyle>
            <SpanStyle><span>Type: </span>{stock.type}</SpanStyle>
            
            
            

        </StockInformation>

        <GraphSection>
            Stock Graph
        </GraphSection>
    </StocksWrapper>
    </>
  )
}

export default Stock
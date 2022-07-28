import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './StockPicker.scss'


const StockPicker = () => {

  const [stockTicker, setStockTicker] = useState([])
  const [selectedTicker, setSelectedTicker] = useState('AAPL')
  const [stockData, setStockData] = useState([])

  const getStockData = () => {
    axios({
      method: 'get',
      url: 'https://yfapi.net/v1/finance/trending/US',
      headers: {
        'X-API-KEY': 'HoQHKV0tbk9a436WLsg1K2N7bPAFbVRq6pvgQA5t'
      }
    }).then((res) => {
      console.log('FULL INFO OBJECT YAHOO API', res)

      const stocksArray = res.data.finance.result[0].quotes.map((stock) => {
        return (
          stock.symbol
        )
      })


      setStockTicker(stocksArray)
      console.log("STOCKS ARRAY", stocksArray)

      axios({
        method: 'get',
        url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stocksArray.join(',')}`,
        headers: {
          'X-API-KEY': 'HoQHKV0tbk9a436WLsg1K2N7bPAFbVRq6pvgQA5t'
        }
      }).then((res) => {
        // console.log('FULL STOCK DATASET FROM YAHOO', res)
        // console.log('PORTION OF DATSET NEEDED', res.data.quoteResponse.result)
        const fullStockData = res.data.quoteResponse.result
        console.log('FULL STOCK DATA', fullStockData)


        const stockObjects = fullStockData.map((data) => (
          {
            symbol: data.symbol,
            fullExchangeName: data.fullExchangeName,
            companyName: data.displayName,
            longName: data.longName,
            currency: data.currency,
            analystRating: data.averageAnalystRating,
            regularMarketDayHigh: data.regularMarketDayHigh,
            regularMarketDayLow: data.regularMarketDayLow,
            fiftyDayAverage: data.fiftyDayAverage,
            fiftyTwoWeekHigh: data.fiftyTwoWeekHigh,
            fiftyTwoWeekRange: data.fiftyTwoWeekRange,
            fiftyTwoWeekLow: data.fiftyTwoWeekLow,
            preMarketPrice: data.preMarketPrice,
            twoHundredDayAverage: data.twoHundredDayAverage,
            twoHundredDayAverageChange: data.twoHundredDayAverageChange
          }
        ))


        console.log(stockObjects)

        setStockData(stockObjects)
        console.log("THIS IS THE STOCK DATA", stockData)
      })


    }).catch((err) => {
      console.log('THIS IS THE ERROR: ', err)
    })
  }

  useEffect(() => {
    getStockData()
  }, [])


  const handleStockSelect = (stock) => {
    setSelectedTicker(stock)
  }

  // const dummyStocks = [{ symbol: 'DIS' }, { symbol: 'NTFX' }, { symbol: 'SONY' }, { symbol: 'AMZN' }, { symbol: 'APPL' }, { symbol: 'NIKE' }, { symbol: 'ADDS' }, { symbol: 'FNDR' }, { symbol: 'GBSN' }, { symbol: 'HYPR' }, { symbol: 'PKMN' }, { symbol: 'WRBR' }]

  const firstStock = ''


  return (
    <div className={styles.stockPickerContainer}>
      <h3>Current Stock: {selectedTicker}</h3>
      <h4>Additional Stock Info: </h4>
      {firstStock}
      <h3>Top 20 Stocks</h3>
      {stockTicker.map((ticker, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              handleStockSelect(ticker)
            }}
          >
            {ticker}
          </li>
        )
      })}
      <h1>STOCK INFO: {stockData[0].symbol}</h1>
    </div>
  )
}

export default StockPicker

/// display yahoo stock data and make able to select a stock

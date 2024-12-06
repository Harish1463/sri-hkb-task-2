import { useState, useEffect } from 'react'

const App = () => {

  const [record, setRecord] = useState([])
  const [specificData, setSpecificData] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("https://run.mocky.io/v3/b2847f7f-f1d8-48d6-84e1-dab1387f1711")
        const users = await response.json()
        setRecord(users.records)
      }
      catch (error) {
        console.log("Error: ", error)
      }
    }
    fetchRecords()
  }, [])


  useEffect(() => {
    if (record.data && specificData) {
      const filtered = record.data.filter((item) => item.expiryDate === specificData)
      setFilteredData(filtered)
    }
    else {
      setFilteredData([])
    }
  }, [specificData, record])

  return (
    <>
      <div>
        <label>Select the Expiry Date: </label>

        <select value={specificData} onChange={(e) => setSpecificData(e.target.value)}>
          <option value="">
            Expiry dates ...
          </option>
          {
            record.expiryDates && record.expiryDates.map((date, index) => {
              return (
                <option key={index} >
                  {date}
                </option>
              )
            })
          }
        </select>

        <div>
          <h1>Selected Details: </h1>
          {
            filteredData.map((item, index) => {
              return (
                <div key={index} >
                  <p>Strike Price: {item.strikePrice}</p>
                  <p style={{ fontWeight: "900" }} >Expiry Date: {item.expiryDate}</p>
                  <p>Underlying: {item.PE.underlying}</p>
                  <p>Identifier: {item.PE.identifier}</p>
                  <p>Open Interest: {item.PE.openInterest}</p>
                  <p>Last Price: {item.PE.lastPrice}</p>
                  <p>Total Buy Quantity: {item.PE.totalBuyQuantity}</p>
                  <p>Bid Quantity: {item.PE.bidQty}</p>
                  <p>Bid Price: {item.PE.bidprice}</p>
                  <p>Implied Volatility: {item.PE.impliedVolatility}</p>
                  <p>Underlying Value: {item.PE.underlyingValue}</p>
                  <hr />
                </div>
              )
            })
          }
        </div>



      </div>
    </>
  )
}

export default App
import React, { useState, useEffect } from "react"

function ConvertCurrency() {
    const [currencies, setCurrencies] = useState([])
    const [fromCurrency, setFromCurrency] = useState('NOK')
    const [toCurrency, setToCurrency] = useState('USD')
    const [amount, setAmount] = useState()
    const [result, setResult] = useState(null)
    const [message, setMessage] = useState('')
    const [exchangeRate, setExchangeRate] = useState()


    // Initialize the currencies and values
    useEffect( async () => {
        await fetch(`https://api.exchangeratesapi.io/latest?base=EUR`)
            .then(res => res.json())
            .then(data => {
                setCurrencies(Object.keys(data.rates))         
                console.log(currencies)
            })
            .catch(error => {console.log("Oops", error.message)});
    }, [])


    // Handles the conversion event
    const Convert = () => {
        //fromCurrency !== toCurrency ? 

        fetch(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res => res.json())
            .then(data => {
                const result = amount * (data.rates[toCurrency])
                setResult(result.toFixed(4))
                setExchangeRate(data.rates[toCurrency].toFixed(3))
            })
            .catch(error => {console.log("Oops", error.message)}) 
        
                
            //: setResult("The currencies are identical, choose ones that differ from one another.")
    }

    // The states are updated by this function based on the currencies the user selects
    const Select = (e) => {
        switch(e.target.name) {
            case "from":
                setFromCurrency(e.target.value)
                break;
            case "to":
                setToCurrency(e.target.value)
                break;
        }
    }


    // Switch currencies (and calculate new exchange rate?)
    const Switch = () => {
        if (toCurrency) {
            setToCurrency(fromCurrency)
            setFromCurrency(toCurrency)
            Convert()
            setMessage(`${toCurrency} ${amount} converts to ${fromCurrency} ${result}`) 
        } 
        //if (fromCurrency) {
        //    setFromCurrency(toCurrency)
        //}
        

        
    }
    
    
    return (
        <div className="container">
            <div className="converter">

                <h3 className="header">Currency Converter</h3>

                <div className="form">
                    <label>Amount</label>
                    <input 
                        name="amount"
                        className="amount-input"
                        placeholder="Amount" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                        <div className="select">
                            <select  
                                name="from"
                                className="currency-selection" 
                                onChange={(e) => Select(e)}
                                value={fromCurrency}
                            >
                                    {currencies.map(currency => (
                                        <option key={currency}>{currency}</option>
                                    ))}
                            </select>

                            <button 
                                className="switch-button"
                                onClick={Switch}
                            >
                                <span className="arrows">Switch</span>
                            </button>
                            
                            <select 
                                className="currency-selection" 
                                name="to"
                                onChange={(e) => Select(e)}
                                value={toCurrency}
                            >
                                    {currencies.map(currency => (
                                        <option key={currency}>{currency}</option>
                                    ))}
                            </select>
                        </div>
                        <label>Exchange rate</label>
                        <input
                            
                            className="exchange-rate"
                            placeholder="Exchange rate"
                            value={exchangeRate} 
                        />
                        <div className="btn"
                            onClick={async () => {
                                await Convert()
                                setMessage(`${fromCurrency} ${amount} converts to ${toCurrency} ${result}`)     
                            }}
                        >
                                <span>Convert</span>
                        </div>
                    </div>

                    <h3 className="message">{message}</h3>

                </div>
        </div>
    )
}

export default ConvertCurrency
// import CurrencyConverter from 'currency-converter-lt';
import fetch from "node-fetch";


const currconvert =async(req,res)=>{
    try {
     const {from_currency,to_currency,total,owe,owed}=req.body;  
        
        fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
        .then(response => {
              return response.json();
        })
        .then(data => {
           let rate = data.rates[to_currency];
           let total_amt = rate * total;
           let owe_amt = rate * owe;
           let owed_amt = rate * owed;
          
         res.json({total_amt,owe_amt,owed_amt})
        })
    } catch (error) {
        console.log(error)
    }
}

export {currconvert};
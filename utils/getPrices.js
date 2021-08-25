const coinGecko = require('coingecko-api')
const coinGeckoClient = new coinGecko()
const axios = require('axios')

module.exports = {
    getCoinGeckoPrice: async (id, decimals) => { 
        let res = await coinGeckoClient.simple.price({
            ids: id,
            vs_currencies: 'usd',
        }).catch(err => { console.log(err) })
    
        let price = parseFloat(res.data[id].usd)
    
        return price.toFixed(decimals)
    },

    getPancakeSwapPrice: async (contract, decimals) => {
        let res = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${contract}`).catch(err => { console.log(err) });
    
        let price = parseFloat(res.data.data.price)
        
        return price.toFixed(decimals)
    }
}
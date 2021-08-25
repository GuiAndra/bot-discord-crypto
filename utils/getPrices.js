const coinGecko = require('coingecko-api')
const coinGeckoClient = new coinGecko()
const axios = require('axios')

module.exports = {
    getCoinGeckoPrice: async (id, decimals) => { 
        let res = await coinGeckoClient.coins.fetch(id).catch(err => { console.log(err) })
    
        return {
            price: (parseFloat(res.data.market_data.current_price.usd).toFixed(decimals) + '').replace('.', ','),
            price_change_percentage_24h: (parseFloat(res.data.market_data.price_change_percentage_24h).toFixed(2) + '').replace('.', ',')
        }
    },

    getPancakeSwapPrice: async (contract, decimals) => {
        let res = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${contract}`).catch(err => { console.log(err) });
    
        let price = parseFloat(res.data.data.price)
        
        return {
            price: price.toFixed(decimals),
            price_change_percentage_24h: '-----'
        }
    }
}
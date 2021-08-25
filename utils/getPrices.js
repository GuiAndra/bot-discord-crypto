const coinGecko = require('coingecko-api')
const coinGeckoClient = new coinGecko()
const axios = require('axios')

module.exports = {
    getCoinGeckoPrice: async (id, decimals) => { 
        let res = await coinGeckoClient.coins.fetch(id).catch(err => { console.log(err) })

        let formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD', maximumFractionDigits: decimals })

        let price = res.data.market_data.current_price.usd
        let price_change_percentage_24h = res.data.market_data.price_change_percentage_24h
    
        return {
            price: formatter.format(price),
            price_change_percentage_24h: formatter.format(price_change_percentage_24h)
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
require('dotenv').config()
const Discord = require("discord.js");
let getPrices = require('./utils/getPrices')
let interval;
let interval2;

let bots = [
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'PVU',
        disc_token: process.env.PVU_DISC_TOKEN,
        arg: 'plant-vs-undead-token',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
        currency: 'usd',
        price: 0,
        price_change_percentage_24h: 0
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'BNB',
        disc_token: process.env.BNB_DISC_TOKEN,
        arg: 'binancecoin',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
        currency: 'usd',
        price: 0,
        price_change_percentage_24h: 0
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'CYT',
        disc_token: process.env.CYT_DISC_TOKEN,
        arg: 'coinary-token',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
        currency: 'usd',
        price: 0,
        price_change_percentage_24h: 0
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'PMON',
        disc_token: process.env.PMON_DISC_TOKEN,
        arg: 'polychain-monsters',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
        currency: 'usd',
        price: 0,
        price_change_percentage_24h: 0
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'SLP',
        disc_token: process.env.SLP_DISC_TOKEN,
        arg: 'smooth-love-potion',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 3,
        currency: 'usd',
        price: 0,
        price_change_percentage_24h: 0
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'ETH',
        disc_token: process.env.ETH_DISC_TOKEN,
        arg: 'ethereum',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
        currency: 'usd',
        price: 0,
        price_change_percentage_24h: 0
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'CCAR',
        disc_token: process.env.CCAR_DISC_TOKEN,
        arg: 'cryptocars',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 3,
        currency: 'usd',
        price: 0,
        price_change_percentage_24h: 0
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'WANA',
        disc_token: process.env.WANA_DISC_TOKEN,
        arg: 'wanaka-farm',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
        currency: 'usd',
        price: 0,
        price_change_percentage_24h: 0
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'BUSD',
        disc_token: process.env.BUSD_DISC_TOKEN,
        arg: 'binance-usd',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 3,
        currency: 'brl',
        price: 0,
        price_change_percentage_24h: 0
    },
]

//Atualiza nome do bot
let updateBotName = async (bot, guild) => {
    if(! bot.price) return
    
    guild.me.setNickname(`${bot.symbol} - ${bot.price}`).catch(err => { console.log(err) })
    
    bot.client.user.setActivity(`24H: ${bot.price_change_percentage_24h}%`, { type: 'PLAYING' });

    console.log(`Update ${guild.name} - ${bot.symbol} - ${bot.price} ${bot.price_change_percentage_24h}%`)
}

//Atualiza cotações das moedas
let updatePrice = async (bot) => {
    let price = await bot.getPrice(bot.arg, bot.decimals, bot.currency).catch(err => { console.log(err) })
    bot.price = price.price
    bot.price_change_percentage_24h = price.price_change_percentage_24h
}

bots.forEach((el) => {

    interval = setInterval (async function () {
        await updatePrice(el)
    }, 30000)
    
    el.client.on('ready', async () => {
        console.log(`Logged in as ${el.client.user.tag}!`);        
        
        //Get servidores conectados
        let guilds = await el.client.guilds.fetch().catch(err => { console.log(err) })

        guilds.forEach(async each => {

            let guild = await el.client.guilds.fetch(each.id).catch(err => { console.log(err) })
            
            interval2 = setInterval (async function () {
                updateBotName(el, guild)
            }, 35000)

        })
        
    });
    
    el.client.login(el.disc_token); 
})
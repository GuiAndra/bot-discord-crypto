require('dotenv').config()
const Discord = require("discord.js");
let getPrices = require('./utils/getPrices')
let interval;

const bots = [
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'PVU',
        disc_token: process.env.PVU_DISC_TOKEN,
        arg: 'plant-vs-undead-token',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'BNB',
        disc_token: process.env.BNB_DISC_TOKEN,
        arg: 'binancecoin',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'CYT',
        disc_token: process.env.CYT_DISC_TOKEN,
        arg: 'coinary-token',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'PMON',
        disc_token: process.env.PMON_DISC_TOKEN,
        arg: 'polychain-monsters',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'SLP',
        disc_token: process.env.SLP_DISC_TOKEN,
        arg: 'smooth-love-potion',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 3,
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'ETH',
        disc_token: process.env.ETH_DISC_TOKEN,
        arg: 'ethereum',
        getPrice: getPrices.getCoinGeckoPrice,
        decimals: 2,
    },
]

let updateBotName = async (bot, guild) => {
    let price = await bot.getPrice(bot.arg, bot.decimals).catch(err => { console.log(err) })
    
    guild.me.setNickname(`${bot.symbol} - ${price.price}`).catch(err => { console.log(err) })
    
    bot.client.user.setActivity(`24H: ${price.price_change_percentage_24h}%`, { type: 'PLAYING' });

    console.log(`Update ${guild.name} - ${bot.symbol} - ${price.price} ${price.price_change_percentage_24h}%`)
}

bots.forEach((el) => {
    
    el.client.on('ready', async () => {
        console.log(`Logged in as ${el.client.user.tag}!`);        
        
        let guilds = await el.client.guilds.fetch().catch(err => { console.log(err) })

        guilds.forEach(async each => {

            let guild = await el.client.guilds.fetch(each.id).catch(err => { console.log(err) })

            updateBotName(el, guild)
        
            interval = setInterval (async function () {
                updateBotName(el, guild)
            }, 20000)

        })
        
    });
    
    el.client.login(el.disc_token); 
})
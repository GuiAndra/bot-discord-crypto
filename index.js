require('dotenv').config()
const Discord = require("discord.js");
let getPrices = require('./utils/getPrices')
let interval;

const bots = [
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'PVU',
        disc_token: process.env.PVU_DISC_TOKEN,
        arg: '0x31471e0791fcdbe82fbf4c44943255e923f1b794',
        getPrice: getPrices.getPancakeSwapPrice,
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
        arg: '0x1796ae0b0fa4862485106a0de9b654efe301d0b2',
        getPrice: getPrices.getPancakeSwapPrice,
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
    let price = await bot.getPrice(bot.arg, bot.decimals)
    guild.me.setNickname(`${bot.symbol} - $${price}`)
}

bots.forEach((el) => {
    
    el.client.on('ready', async () => {
        console.log(`Logged in as ${el.client.user.tag}!`);        
        
        let guilds = await el.client.guilds.fetch()

        guilds.forEach(async each => {

            let guild = await el.client.guilds.fetch(each.id)

            updateBotName(el, guild)
        
            interval = setInterval (async function () {
                updateBotName(el, guild)
            }, 60000)

        })
        
    });
    
    el.client.login(el.disc_token); 
})
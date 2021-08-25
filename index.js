const Discord = require("discord.js");
let getPrices = require('./utils/getPrices')
let interval;

const bots = [
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'PVU',
        disc_token: 'ODc5ODE3NjI5OTI4Mzk0NzYy.YSVQBQ.fcwJoTdMeMWLgF3v4TuteKxwoU0',
        arg: '0x31471e0791fcdbe82fbf4c44943255e923f1b794',
        getPrice: getPrices.getPancakeSwapPrice
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'BNB',
        disc_token: 'ODc5ODY3OTU2NDIxNjExNjIx.YSV-4w.fm3iW-7wo9d83PpatCaIBqiJICs',
        arg: 'binancecoin',
        getPrice: getPrices.getCoinGeckoPrice
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'CYT',
        disc_token: 'ODc5ODkxMjI0NTkxNDcwNjI0.YSWUjw.HDWMg-mCDU-TV_0gAfM6iFpcHh8',
        arg: 'coinary-token',
        getPrice: getPrices.getCoinGeckoPrice
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'PMON',
        disc_token: 'ODc5ODkxMDMxNDU2MzU0MzM0.YSWUYQ.Ffd3CDUMRjyd6hYXoG8gPKZdrs4',
        arg: '0x1796ae0b0fa4862485106a0de9b654efe301d0b2',
        getPrice: getPrices.getPancakeSwapPrice
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'SLP',
        disc_token: 'ODc5ODkxMDkxMTI0NTE4OTEz.YSWUbw.BdHSHHKzMNBo5mWUZ-ikG0O-Iuo',
        arg: 'smooth-love-potion',
        getPrice: getPrices.getCoinGeckoPrice
    },
    {
        client: new Discord.Client({ intents: ["GUILDS"] }),
        symbol: 'ETH',
        disc_token: 'ODc5ODkxMTQ1NDI0MDA3MTY4.YSWUfA.xZBwQk_m5x-C4YEE-SIXuqTJdjk',
        arg: 'ethereum',
        getPrice: getPrices.getCoinGeckoPrice
    },
]

let updateBotName = async (bot, guild) => {
    let price = await bot.getPrice(bot.arg)
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
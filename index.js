console.clear()
process.title = "Thanks to high#1337 <3"
const Token = require("./settings").Token
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
	checkUpdate: false
});
const time = Date.now()
const fs = require("fs")
require("colors")

client.on("ready", async () => {
    await client.guilds.fetch();
    const guilds = Array.from(client.guilds.cache.values());
    console.log(" * ".bgCyan + ` Found ${guilds.length} servers. It can take a while.`.bgMagenta)
    for (let i = 0; i < guilds.length; i++) {
        const { id, name } = guilds[i];
        await fetch(id, name, guilds.length);
    }
});


async function fetch(id, name, length) {
    let data = ""; 
    let data2 = ""; 
    const guild = await client.guilds.cache.get(id);
    console.log(" * ".bgCyan + ` Checking - ${name} `.bgRed);
    if (name.startsWith("/r")) return console.log(" * ".bgCyan + `${name} returned.`.bgRed)
    const members = await guild.members.fetch();
    let accountCount = 0
    for (const member of members) {
        const badges = member[1].user.flags.toArray();
        if (!badges.toString()) continue;
        if (badges.toString().includes("HOUSE_BRAVERY")) continue;
        if (badges.toString().includes("HOUSE_BALANCE")) continue;
        if (badges.toString().includes("HOUSE_BRILLIANCE")) continue;
        if (badges.toString().includes("VERIFIED_BOT")) continue;
        if (badges.toString().includes("SPAMMER")) continue;
        data += `Server Name: ${name} - ${member[1].user.username}#${member[1].user.discriminator} (${member[1].user.id}): ${badges.join(', ')}\n`;
        data2 += `${member[1].user.username}#${member[1].user.discriminator} (${member[1].user.id}): ${badges.join(', ')}\n`;
        accountCount ++;
    }
    if (!fs.existsSync(`./${time}`)) fs.mkdirSync(`./${time}`)
    fs.writeFileSync(`./${time}/${name}-${time}.txt`, data2);
    console.log(" * ".bgCyan + ` Checked - ${name} - Total Badges - ${accountCount} `.bgBlue + "" + `File: ${time}/${name}-${time}`.bgBlue);
    length = length - 1
    console.log(" * ".bgCyan + ` ${length} servers left.`.bgYellow )
}



client.login(Token)

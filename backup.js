const discord = require("discord.js");
const config = require("./config.json");
const fetch = require('node-fetch');

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    
    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);

    });

});

fs.readdir("./commands/dice", (err, files2) => {

    if(err) console.log(err);
    
    var jsFiles2 = files2.filter(f => f.split(".").pop() === "js");

    if (jsFiles2.length <= 0) {
        console.log("kon geen files vinden");
        return;
    }

    jsFiles2.forEach((f, i) => {

        var fileGet = require(`./commands/dice/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);

    });

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity(`D&D`, { type: "Watching" });

});

bot.on("message", async message => {

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;

    if (message.isMemberMentioned(bot.user)) {
        message.channel.send(`My prefix is: **${prefix}**`)
    }

    var roles = prefixes[message.guild.id].role;

    if (message.content.startsWith(prefix)) {
        if(message.author.bot) return;

        if(message.channel.type === "dm") return;
    
        var messageArray = message.content.split(" ");
    
        var command = messageArray[0];
    
        var arguments = messageArray.slice(1);
    
        var commands = bot.commands.get(command.slice(prefix.length));
    
        if(commands) commands.run(bot,message, arguments);
    }

});

bot.login(config.token);
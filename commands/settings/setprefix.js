const discord = require("discord.js");
const botConfig = require("../../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No Permissions!");

    if (!args[0]) return message.channel.send("Use: `setprefix <prefix>`"); else message.channel.send(`:white_check_mark: prefix updated!`);

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFileSync(`prefixes.json`, JSON.stringify(prefixes), (err) => {
        	if (err) console.log(err);
    });
}

module.exports.help = {
    name: "setprefix"
}
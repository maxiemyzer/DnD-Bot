const discord = require("discord.js");
const botConfig = require("../../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    
    var roll = Math.floor((Math.random() * 20) + 1);

    var rollEmbed = new discord.RichEmbed()
    .setTitle("D20")
    .addField("result", roll)
    .setColor("FF0000")
    .setFooter("ROLLED D20", message.author.avatarURL)

    message.channel.send(rollEmbed)

}

module.exports.help = {
    name: "d20"
}
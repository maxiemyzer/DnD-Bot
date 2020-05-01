const discord = require("discord.js");
const botConfig = require("../../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    
    var roll = Math.floor((Math.random() * 4) + 1);

    var rollEmbed = new discord.MessageEmbed()
    .setTitle("D4")
    .addField("result", roll)
    .setColor("FF0000")
    .setFooter("ROLLED D4", message.author.avatarURL)

    message.channel.send(rollEmbed)

}

module.exports.help = {
    name: "d4"
}
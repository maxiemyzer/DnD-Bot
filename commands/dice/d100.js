const discord = require("discord.js");
const botConfig = require("../../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    
    var roll = Math.floor((Math.random() * 100) + 1);

    var rollEmbed = new discord.MessageEmbed()
    .setTitle("D100")
    .addField("result", roll)
    .setColor("FF0000")
    .setFooter("ROLLED D100", message.author.avatarURL)

    message.channel.send(rollEmbed)

}

module.exports.help = {
    name: "d100"
}
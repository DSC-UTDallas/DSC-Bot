const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

exports.sendRulesReaction = async (msg) => {
  const text = fs.readFileSync(path.resolve(__dirname, "../rules.txt"), "utf8");
  const rules = text.split("\n");
  const agreement = [rules[rules.length - 1]];
  const embed = new Discord.MessageEmbed()
    .setTitle("Agreement to Community Guidelines and Rules")
    .setColor(0x2b85d3)
    .setDescription(agreement);
  let agreementMsg = await msg.channel.send(embed);
  agreementMsg.react("👍");
};

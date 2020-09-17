const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

exports.sendRulesReaction = async (msg, emoji) => {
  commands = [
    `${emoji} !help: To get the list of commands`,
    `${emoji} !ideas: To see the list of ideas for next meeting agenda`,
    `${emoji} !addIdea <idea>: To add an idea for next meeting agenda`,
    `${emoji} !removeIdea <idea>: To remove the idea from next meeting agenda`,
  ];
  var rules = [];
  let text = fs.readFileSync(path.resolve(__dirname, "../rules.txt"), "utf8");
  rules = [text];
  console.log(rules);
  const embed = new Discord.MessageEmbed()
    .setTitle("Community Guidelines and Rules")
    .setColor(0x2b85d3)
    .setDescription(rules);
  msg.channel.send(embed);
};

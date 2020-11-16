const Discord = require("discord.js");
const { POSTidea, GETagenda, DELETEidea } = require("../utils/firebase");

exports.sendCommands = (msg, emoji) => {
  commands = [
    `${emoji} !help: To get the list of commands`,
    `${emoji} !ideas: To see the list of ideas and their indexes for next meeting agenda`,
    `${emoji} !addIdea <idea>: To add an idea for next meeting agenda (each idea will get assigned a random index)`,
    `${emoji} !removeIdea <idea-index>: To remove the idea from next meeting agenda`,
  ];
  msg.channel.send("These are the commands you can use (not case-sensitive):");

  const embed = new Discord.MessageEmbed()
    .setTitle("Command List")
    .setColor(0x2b85d3)
    .setDescription(commands);
  msg.channel.send(embed);

  msg.delete({ timeout: 1000 });
};

exports.addIdea = async (msg, idea) => {
  POSTidea(idea);
  msg.delete({ timeout: 1000 });
};

exports.getIdeas = async (msg, emoji) => {
  agenda = await GETagenda(emoji);

  //msg.channel.send("These are the agenda items for next meeting: ");
  const embed = new Discord.MessageEmbed()
    .setTitle("Agenda Ideas for Next Meeting")
    .setColor(0x2b85d3)
    .setDescription(agenda);
  msg.channel.send(embed);

  msg.delete({ timeout: 1000 });
};

exports.deleteIdea = async (msg, idea) => {
  DELETEidea(idea);
  msg.delete({ timeout: 1000 });
};

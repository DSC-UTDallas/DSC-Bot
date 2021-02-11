const Discord = require("discord.js");
const { POSTidea, GETagenda, DELETEidea } = require("../utils/firebase");

exports.addIdea = async (msg, idea) => {
  POSTidea(idea);
  msg.react("👍");
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
  msg.react("👍");
};

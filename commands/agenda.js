const Discord = require("discord.js");
const { POSTidea, GETagenda, DELETEidea } = require("../utils/firebase");

exports.addIdea = async (msg) => {
  const idea = msg.content.substr(msg.content.indexOf(" ") + 1);
  POSTidea(idea);
  msg.react("👍");
};

exports.getIdeas = async (msg) => {
  const emoji = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");
  agenda = await GETagenda(emoji);

  const embed = new Discord.MessageEmbed()
    .setTitle("Agenda Ideas for Next Meeting")
    .setColor(0x2b85d3)
    .setDescription(agenda);
  msg.channel.send(embed);

  msg.delete({ timeout: 1000 });
};

exports.deleteIdea = async (msg) => {
  const idea = msg.content.substr(msg.content.indexOf(" ") + 1);
  DELETEidea(idea);
  msg.react("👍");
};

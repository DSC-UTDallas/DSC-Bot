const Discord = require("discord.js");
const { POSTtodo, GETtodo, DELETEtodo } = require("../utils/firebase");

exports.addTodo = async (msg, idea) => {
  POSTtodo(idea);
  msg.react("👍");
};

exports.getTodo = async (msg, team) => {
  const emoji = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");
  agenda = await GETtodo(team, emoji);

  //msg.channel.send("These are the agenda items for next meeting: ");
  const embed = new Discord.MessageEmbed()
    .setTitle("Todo Items for This Team")
    .setColor(0x2b85d3)
    .setDescription(agenda);
  msg.channel.send(embed);

  msg.delete({ timeout: 1000 });
};

exports.deleteTodo = async (msg, idea) => {
  DELETEtodo(idea);
  msg.react("👍");
};

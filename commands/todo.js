const Discord = require("discord.js");
const { POSTtodo, GETtodo, DELETEtodo } = require("../utils/firebase");

exports.addTodo = async (msg, idea) => {
  POSTtodo(idea);
  msg.delete({ timeout: 1000 });
};

exports.getTodo = async (msg, team, emoji) => {
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
  msg.delete({ timeout: 1000 });
};

const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");
const { POSTtodo, GETtodo, DELETEtodo } = require("../utils/firebase");

exports.addTodo = async (msg, ideaDetails) => {
  const team = ideaDetails.substr(0, ideaDetails.indexOf(" "));
  const idea = ideaDetails.substr(ideaDetails.indexOf(" ") + 1);
  try {
    POSTtodo(team, idea);
    msg.react("👍");
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " added " +
        idea +
        " todo items for role " +
        team
    );
  } catch (e) {
    loggerError(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not add " +
        idea +
        " todo items for role " +
        team,
      e
    );
  }
};

exports.getTodo = async (msg, team) => {
  const emoji = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");
  var agenda;

  try {
    agenda = await GETtodo(team, emoji);
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " requested todo items for role " +
        team
    );
  } catch (e) {
    loggerError(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not request todo items for role " +
        team,
      e
    );
  }

  //msg.channel.send("These are the agenda items for next meeting: ");
  const embed = new Discord.MessageEmbed()
    .setTitle("Todo Items for This Team")
    .setColor(0x2b85d3)
    .setDescription(agenda);
  msg.channel.send(embed);

  msg.delete({ timeout: 1000 });
};

exports.deleteTodo = async (msg, ideaDetails) => {
  const team = ideaDetails.substr(0, ideaDetails.indexOf(" "));
  const idea = ideaDetails.substr(ideaDetails.indexOf(" ") + 1);
  try {
    DELETEtodo(team, idea);
    msg.react("👍");
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " deleted idea index " +
        idea +
        " from todo items for role " +
        team
    );
  } catch (e) {
    loggerError(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not delete idea index " +
        idea +
        " from todo items for role " +
        team,
      e
    );
  }
};

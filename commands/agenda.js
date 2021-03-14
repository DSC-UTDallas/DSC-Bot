const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");
const { POSTidea, GETagenda, DELETEidea } = require("../utils/firebase");

exports.addIdea = async (msg) => {
  const idea = msg.content.substr(msg.content.indexOf(" ") + 1);
  try {
    POSTidea(idea);
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " added " +
        idea +
        " to officer meeting agenda"
    );
  } catch (e) {
    loggerError(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not add " +
        idea +
        " to officer meeting agenda",
      e
    );
  }

  msg.react("👍");
};

exports.getIdeas = async (msg) => {
  const emoji = msg.guild.emojis.cache.find((emoji) => emoji.name === "dsc");
  var agenda;

  try {
    agenda = await GETagenda(emoji);
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " requested officer meeting agenda"
    );
  } catch (e) {
    loggerError(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not request officer meeting agenda",
      e
    );
  }

  const embed = new Discord.MessageEmbed()
    .setTitle("Agenda Ideas for Next Meeting")
    .setColor(0x2b85d3)
    .setDescription(agenda);
  msg.channel.send(embed);

  msg.delete({ timeout: 1000 });
};

exports.deleteIdea = async (msg) => {
  const idea = msg.content.substr(msg.content.indexOf(" ") + 1);
  try {
    DELETEidea(idea);
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " deleted idea index " +
        idea +
        " from officer meeting agenda"
    );
  } catch (e) {
    loggerError(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not delete idea index " +
        idea +
        " from officer meeting agenda",
      e
    );
  }
  msg.react("👍");
};

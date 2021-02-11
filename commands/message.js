const Discord = require("discord.js");

exports.sendMessage = async (msg, client, channelID, message) => {
  client.channels.cache.get(channelID).send(message);
  msg.react("👍");
};

exports.sendDM = async (msg, client, userID, message) => {
  if (client.users.cache.get(userID).bot) {
    msg.reply("User is a bot");
  } else {
    client.users.cache.get(userID).send(message);
    msg.react("👍");
  }
};

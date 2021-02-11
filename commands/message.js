const Discord = require("discord.js");

exports.sendMessage = async (client, channelID, message) => {
  client.channels.cache.get(channelID).send(message);
};

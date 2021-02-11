exports.sendMessage = async (msg, client, channelID, message) => {
  const channel = client.channels.cache.get(channelID);
  if (channel) {
    channel.send(message);
    msg.react("👍");
  } else {
    msg.reply("Channel does not exist");
  }
};

//TODO: Work on this
exports.sendDM = async (msg, client, userID, message) => {
  const user = client.users.cache.get(userID);
  // if (!user) {
  //   msg.reply("User does not exist");
  // } else
  if (user.bot) {
    msg.reply("User is a bot");
  } else {
    user.send(message);
    msg.react("👍");
  }
};

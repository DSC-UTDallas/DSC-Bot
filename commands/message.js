exports.sendMessage = async (msg, client) => {
  const messageDetails = msg.content.substr(msg.content.indexOf(" ") + 1);
  const channelID = messageDetails.substr(0, messageDetails.indexOf(" "));
  const message = messageDetails.substr(messageDetails.indexOf(" ") + 1);
  const channel = client.channels.cache.get(channelID);

  if (channel) {
    channel.send(message);
    msg.react("👍");
  } else {
    msg.reply("Channel does not exist");
  }
};

//TODO: Work on this
exports.sendDM = async (msg, client) => {
  const messageDetails = msg.content.substr(msg.content.indexOf(" ") + 1);
  const userID = messageDetails.substr(0, messageDetails.indexOf(" "));
  const message = messageDetails.substr(messageDetails.indexOf(" ") + 1);
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

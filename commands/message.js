const {
  loggerInfo,
  loggerError,
  generalLogging,
} = require("../utils/logging.js");

exports.sendMessage = async (msg, client) => {
  const messageDetails = msg.content.substr(msg.content.indexOf(" ") + 1);
  const channelID = messageDetails.substr(0, messageDetails.indexOf(" "));
  const message = messageDetails.substr(messageDetails.indexOf(" ") + 1);
  const channel = client.channels.cache.get(channelID);

  const messageSender = (msg, client) => {
    const messageDetails = msg.content.substr(msg.content.indexOf(" ") + 1);
    const channelID = messageDetails.substr(0, messageDetails.indexOf(" "));
    const message = messageDetails.substr(messageDetails.indexOf(" ") + 1);
    const channel = client.channels.cache.get(channelID);

    if (channel) {
      channel.send(message);
      msg.react("👍");
    } else {
      msg.reply("channel " + channelID + " does not exist");
    }
  };

  const successMessage =
    msg.author.username +
    "#" +
    msg.author.discriminator +
    " sent " +
    message +
    " to channel " +
    channelID;
  const errorMessage =
    msg.author.username +
    "#" +
    msg.author.discriminator +
    " sent " +
    message +
    " to channel " +
    channelID;

  generalLogging(messageSender, successMessage, errorMessage, "");

  try {
    if (channel) {
      channel.send(message);
      loggerInfo(
        msg.author.username +
          "#" +
          msg.author.discriminator +
          " sent " +
          message +
          " to channel " +
          channelID
      );
      msg.react("👍");
    } else {
      msg.reply("Channel does not exist");
      loggerError(
        msg.author.username +
          "#" +
          msg.author.discriminator +
          " tried to send " +
          message +
          " to channel " +
          channelID +
          " which does not exist",
        "channel" + channelID + " does not exist"
      );
    }
  } catch (e) {
    loggerError(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not send " +
        message +
        " to channel " +
        channelID,
      e
    );
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

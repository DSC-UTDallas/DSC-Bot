const { loggerInfo, loggerError } = require("../utils/logging.js");

exports.setStream = async (client, msg) => {
  message = msg.content.substr(msg.content.indexOf(" ") + 1);
  stream = message.substr(0, message.indexOf(" "));
  eventName = message.substr(message.indexOf(" ") + 1);

  try {
    client.user.setActivity(eventName, {
      type: "STREAMING",
      url: stream,
    });
    msg.suppressEmbeds(true);
    msg.react("👍");

    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " set stream to " +
        stream
    );
  } catch (e) {
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not set stream to " +
        stream,
      "e"
    );
  }
};

exports.stopStream = async (client, msg) => {
  try {
    client.user.setActivity("!help", { type: "LISTENING" });
    msg.react("👍");
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " set stream back to default "
    );
  } catch (e) {
    loggerInfo(
      msg.author.username +
        "#" +
        msg.author.discriminator +
        " could not set stream back to default",
      e
    );
  }
};

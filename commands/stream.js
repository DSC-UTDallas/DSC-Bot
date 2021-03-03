exports.setStream = async (client, msg) => {
  message = msg.content.substr(msg.content.indexOf(" ") + 1);
  stream = message.substr(0, message.indexOf(" "));
  eventName = message.substr(message.indexOf(" ") + 1);

  client.user.setActivity(eventName, {
    type: "STREAMING",
    url: stream,
  });

  msg.suppressEmbeds(true);
  msg.react("👍");
};

exports.stopStream = async (msg, client) => {
  client.user.setActivity("!help", { type: "LISTENING" });
  msg.react("👍");
};

const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");

const qotdRoleID = "828768969808674836";

exports.sendQOTD = async (client, msg) => {
  const content = msg.content.substr(msg.content.indexOf(" ") + 1);
  const sender = content.split("|")[0];
  const question = content.split("|")[1];
};

const Discord = require("discord.js");

const id = process.env.reaction_log_webhook_id;
const token = process.env.reaction_log_webhook_token;

const webhook = new Discord.WebhookClient(id, token);

exports.logReactionRequest = async (user, role) => {
  webhook.send(`${user} reacted to get role ${role}`).catch(console.error);
};

exports.logReactionSuccess = async (user, role) => {
  webhook.send(`${user} got role ${role}`).catch(console.error);
};

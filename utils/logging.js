// Imports the Google Cloud client library for Bunyan
const bunyan = require("bunyan");
const { LoggingBunyan } = require("@google-cloud/logging-bunyan");
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// Creates a client
const loggingBunyan = new LoggingBunyan({
  projectId: process.env.projectId,
  keyFilename: "./gcp-service-account.json",
});

// Create a Bunyan logger that streams to Cloud Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Cloud Logging will contain "name": "dsc-agenda-bot"
  name: process.env.loggingBucket,
  streams: [
    // Log to the console at 'info' and above
    //{ stream: process.stdout, level: "info" },
    // And log to Cloud Logging, logging at 'info' and above
    loggingBunyan.stream("info"),
  ],
});

const id = process.env.log_webhook_id;
const token = process.env.log_webhook_token;

const webhook = new Discord.WebhookClient(id, token);

exports.loggerInfo = async (infoMessage) => {
  logger.info(infoMessage);
};

exports.loggerError = async (errorMessage, error) => {
  logger.error(errorMessage);
  logger.error(error);
  //prod
  // webhook.send("<@&815429572891770901>" + errorMessage).catch(console.error);
  //dev
  webhook.send("<@&804262550110994433> " + errorMessage).catch(console.error);
};

exports.logReactionRequest = async (user, role) => {
  webhook.send(`${user} reacted to get role ${role}`).catch(console.error);
};

exports.logReactionSuccess = async (user, role) => {
  webhook.send(`${user} got role ${role}`).catch(console.error);
};

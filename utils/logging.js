// Imports the Google Cloud client library for Bunyan
const bunyan = require("bunyan");
const { LoggingBunyan } = require("@google-cloud/logging-bunyan");

// Creates a client
const loggingBunyan = new LoggingBunyan({
  projectId: process.env.projectId,
  keyFilename: "./gcp-service-account.json",
});

// Create a Bunyan logger that streams to Cloud Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
exports.logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Cloud Logging will contain "name": "dsc-agenda-bot"
  name: "dsc-test",
  streams: [
    // Log to the console at 'info' and above
    { stream: process.stdout, level: "info" },
    // And log to Cloud Logging, logging at 'info' and above
    loggingBunyan.stream("info"),
  ],
});

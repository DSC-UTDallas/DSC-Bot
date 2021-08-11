const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");
const { GETevents } = require("../utils/firebase");

exports.getEventDeadlines = async (client, msg) => {
  const events = await GETevents();
  var relevantEvents = [];

  var today = new Date();
  today.setDate(today.getDate());

  events.forEach((event) => {
    var eventDate = event.date.toDate();

    var minThresholdDate = new Date();
    minThresholdDate.setDate(eventDate.getDate() - 31);

    var maxThresholdDate = new Date();
    maxThresholdDate.setDate(eventDate.getDate() + 7);

    // console.log("event", event.name);
    // console.log("date", event.date.toDate());
    // console.log("start", minThresholdDate, "end", maxThresholdDate);

    if (minThresholdDate <= today && maxThresholdDate >= today) {
      // console.log(event.name);
      // console.log(event.date.toDate());
      relevantEvents.push(event);
    }
  });

  console.log(relevantEvents);

  msg.react("👍");
};

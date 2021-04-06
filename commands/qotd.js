const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");

//Use 828774983001702462 for production
//Use 828768969808674836 for dev
const qotdRoleID = "828774983001702462";

exports.sendQOTD = async (client, msg) => {
  const content = msg.content.substr(msg.content.indexOf(" ") + 1);
  const sender = content.split("|")[0];
  const question = content.split("|")[1];

  //msg.channel.send("<@&" + qotdRoleID + ">");
  // Design 1
  // const embed = new Discord.MessageEmbed()
  //   .setTitle("Question of the Day")
  //   .setColor(0x2b85d3)
  //   .addFields(
  //     { name: "Question", value: question },
  //     { name: "Asked by", value: sender },
  //     {
  //       name: "Ask the next QOTD",
  //       value: "https://forms.gle/wNfQcycbedaRwYnU7",
  //       inline: true,
  //     }
  //   );

  //Design 2
  const embed = new Discord.MessageEmbed()
    .setTitle("Question of the Day")
    .setColor(0x2b85d3)
    .addFields(
      { name: "Question", value: question },
      { name: "Asked by", value: sender, inline: true }
    )
    .addField("Ask the next QOTD", "https://forms.gle/wNfQcycbedaRwYnU7", true);

  //Design 3
  // msg.channel.send(
  //   "<@&" +
  //     qotdRoleID +
  //     "> Ask the next QOTD: https://forms.gle/wNfQcycbedaRwYnU7"
  // );
  // const embed = new Discord.MessageEmbed()
  //   .setTitle("Question of the Day")
  //   .setColor(0x2b85d3)
  //   .setAuthor(sender)
  //   .setDescription(question);

  msg.react("👍");
  msg.channel.send(embed);
};

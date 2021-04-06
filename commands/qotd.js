const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");

exports.sendQOTD = async (client, msg) => {
  const content = msg.content.substr(msg.content.indexOf(" ") + 1);
  const sender = content.split("|")[0];
  const question = content.split("|")[1];

  //Use 828774983001702462 for production
  //Use 828768969808674836 for dev
  const qotdRoleID = "828774983001702462";
  //Use 756050285842923561 for production
  //Use "" for dev
  const channelID = "756050285842923561";
  const channel = client.channels.cache.get(channelID);

  channel.send("<@&" + qotdRoleID + ">");
  const embed = new Discord.MessageEmbed()
    .setTitle("Question of the Day")
    .setColor(0x2b85d3)
    .addFields(
      { name: "Question", value: question },
      { name: "Asked by", value: sender, inline: true }
    )
    .addField("Ask the next QOTD", "https://forms.gle/wNfQcycbedaRwYnU7", true);

  msg.react("👍");
  const allMessages = await channel.messages.fetch();
  const pinned = allMessages.filter(
    (message) => message.pinned && message.author.bot
  );
  await pinned.forEach((pin) => pin.unpin());
  channel.send(embed).then((qotdMessage) => qotdMessage.pin());
};

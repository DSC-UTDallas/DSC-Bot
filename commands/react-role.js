const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

//TODO: Figure how to reference from name instead of id
const memberRoleID = "756046335832096789";

exports.sendRulesReaction = async (msg) => {
  const text = fs.readFileSync(path.resolve(__dirname, "../rules.txt"), "utf8");
  const rules = text.split("\n");

  const agreement = [rules[rules.length - 1]];

  const embedRules = new Discord.MessageEmbed()
    .setTitle("Community Guidelines and Rules")
    .setColor(0x2b85d3)
    .setDescription(rules.slice(0, 17));
  msg.channel.send(embedRules);

  const embedAgreement = new Discord.MessageEmbed()
    .setTitle("Agreement to Community Guidelines and Rules")
    .setColor(0x2b85d3)
    .setDescription(agreement);
  let agreementMsg = await msg.channel.send(embedAgreement);
  agreementMsg.react("👍");

  msg.delete({ timeout: 1000 });
};

exports.addRole = async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (reaction.message.channel.name === "rules") {
    if (reaction.emoji.name === "👍") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(memberRoleID);
    }
  }
};

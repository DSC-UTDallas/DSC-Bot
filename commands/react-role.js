const Discord = require("discord.js");
const {
  loggerInfo,
  loggerError,
  logReactionRequest,
} = require("../utils/logging.js");
const fs = require("fs");
const path = require("path");

//prod
const memberRoleID = "756049478330613801";
//dev
// const memberRoleID = "756046335832096789";

exports.sendRulesReaction = async (msg) => {
  const text = fs.readFileSync(path.resolve(__dirname, "../rules.txt"), "utf8");
  const rules = text.split("\n");

  const agreement = rules.slice(16, 23);

  const embedRules = new Discord.MessageEmbed()
    .setTitle("Community Guidelines and Rules")
    .setColor(0x2b85d3)
    .setDescription(rules.slice(0, 15));
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
      try {
        // await reaction.message.guild.members.cache
        //   .get(user.id)
        //   .roles.add(memberRoleID);
        user = await reaction.message.guild.members.cache.get(user.id);
        loggerInfo(user);
        logReactionRequest(user, reaction.emoji.name);
        reactionID = reactionRolesMapping.get(reaction.emoji.name);
        if (user.roles.cache.find((r) => r.id === reactionID)) {
          user.roles.remove(reactionID);
        } else {
          user.roles.add(reactionID);
          logReactionSuccess(user, reaction.emoji.name);
        }
        reaction.message.reactions.cache // remove reaction from the message
          .find((r) => r.emoji.name == reaction.emoji.name)
          .users.remove(user);
        loggerInfo(
          user.username + "#" + user.discriminator + " was given role Member"
        );
      } catch (e) {
        loggerError(
          user.username +
            "#" +
            user.discriminator +
            " was not given role Member",
          e
        );
      }
    }
  }
};

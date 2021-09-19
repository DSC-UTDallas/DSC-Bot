const Discord = require("discord.js");
const {
  loggerInfo,
  loggerError,
  logReactionRequest,
  logReactionSuccess,
} = require("../utils/logging.js");
const fs = require("fs");
const path = require("path");

//prod
const rulesChannelID = "756053715563315221";
const rolesChannelID = "850180171923062785";

const memberRoleID = "756049478330613801";
const partnerRoleID = "850173831049904169";
const qotdRoleID = "828768969808674836";
const factRoleID = "850173983453741057";

//dev
// const rulesChannelID = "756050285842923561";
// const rolesChannelID = "756050285842923561";

// const memberRoleID = "756046335832096789";
// const partnerRoleID = "850181566932189234";
// const qotdRoleID = "828774983001702462";
// const factRoleID = "850181730115780638";

const reactionRolesMapping = new Map([
  ["👍", memberRoleID],
  ["🥳", partnerRoleID],
  ["❓", qotdRoleID],
  ["💫", factRoleID],
]);

exports.sendRulesReaction = async (client, msg) => {
  const rulesChannel = client.channels.cache.get(rulesChannelID);

  const text = fs.readFileSync(path.resolve(__dirname, "../rules.txt"), "utf8");
  const rules = text.split("\n");

  const agreement = rules.slice(16, 23);

  const embedRules = new Discord.MessageEmbed()
    .setTitle("Community Guidelines and Rules")
    .setColor(0x2b85d3)
    .setDescription(rules.slice(0, 15));
  rulesChannel.send(embedRules);

  const embedAgreement = new Discord.MessageEmbed()
    .setTitle("Agreement to Community Guidelines and Rules")
    .setColor(0x2b85d3)
    .setDescription(agreement);
  let agreementMsg = await rulesChannel.send(embedAgreement);
  agreementMsg.react("👍");

  msg.react("👍");
};

exports.sendRolesReaction = async (client, msg) => {
  const rolesChannel = client.channels.cache.get(rolesChannelID);

  const embedRoles = new Discord.MessageEmbed()
    .setTitle("Role Notifications")
    .setColor(0x2b85d3)
    .setDescription(
      `React with certain emojis to gain certain roles to get notifications! Make sure to react to the rules to get access to these notifications!
      🥳 Partner Events
      ❓ QOTW
      💫 Weekly Fun Facts`
    );
  let rolesMsg = await rolesChannel.send(embedRoles);
  rolesMsg.react("🥳");
  rolesMsg.react("❓");
  rolesMsg.react("💫");

  msg.react("👍");
};

exports.addRole = async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (
    (reaction.message.channel.id === rulesChannelID) |
    (reaction.message.channel.id === rolesChannelID)
  ) {
    if (reactionRolesMapping.has(reaction.emoji.name)) {
      try {
        // user = await reaction.message.guild.members.cache.get(user.id);
        //loggerInfo(user);
        logReactionRequest(user, reaction.emoji.name);
        reactionID = reactionRolesMapping.get(reaction.emoji.name);
        console.log(user);
        if (user.roles.find((r) => r.id === reactionID)) {
          user.roles.remove(reactionID);
        } else {
          user.roles.add(reactionID);
          logReactionSuccess(user, reaction.emoji.name);
        }
        reaction.message.reactions.cache // remove reaction from the message
          .find((r) => r.emoji.name == reaction.emoji.name)
          .users.remove(user);
        loggerInfo(
          user.username +
            "#" +
            user.discriminator +
            ` was given role ${reaction.emoji.name}`
        );
      } catch (e) {
        console.log(e);
        loggerError(
          user.username +
            "#" +
            user.discriminator +
            ` was not given role ${reaction.emoji.name}`,
          e
        );
      }
    }
  }
};

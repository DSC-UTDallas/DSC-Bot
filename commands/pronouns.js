const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");

//prod
// const rolesChannelID = "850180171923062785";

//dev
const rolesChannelID = "756050285842923561";

const reactionRolesMapping = new Map([
  ["💖", "(she/her)"],
  ["💙", "(he/him)"],
  ["💜", "(they/them)"],
  ["💛", "(she/they)"],
  ["💚", "(he/they)"],
  ["🧡", "(ze/zer)"],
  ["🤍", "(any pronouns)"],
  ["❓", "(ask my pronouns)"],
]);

exports.sendPronounsReaction = async (client, msg) => {
  const rolesChannel = client.channels.cache.get(rolesChannelID);

  const embedRoles = new Discord.MessageEmbed()
    .setTitle("Add Pronuns to Nickname")
    .setColor(0x2b85d3)
    .setDescription(
      `Here at DSC UTD, we value, love, and respect all identities! If you're comfortable with it, we'd like you to react with the corresponding heart to your pronouns so it can be added to your nickname. If your pronouns is not on this list, let one of our developers know and we'll add it to the list!.
      💖 she/her
      💙 he/him
      💜 they/them
      💛 she/they
      💚 he/they
      🧡 ze/zer
      🤍 any pronouns
      ❓ ask my pronouns`
    );
  let rolesMsg = await rolesChannel.send(embedRoles);
  rolesMsg.react("💖");
  rolesMsg.react("💙");
  rolesMsg.react("💜");
  rolesMsg.react("💛");
  rolesMsg.react("💚");
  rolesMsg.react("🧡");
  rolesMsg.react("🤍");
  rolesMsg.react("❓");

  msg.react("👍");
};

exports.addPronoun = async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id === rolesChannelID) {
    if (reactionRolesMapping.has(reaction.emoji.name)) {
      pronouns = reactionRolesMapping.get(reaction.emoji.name);
      try {
        user = await reaction.message.guild.members.cache.get(user.id);
        var name = "";
        if (user.nickname == null) name = user.user.username;
        else name = user.nickname;
        if (name.indexOf("(") != -1) name = name.substr(0, name.indexOf("("));
        user.setNickname(name + pronouns);
        reaction.message.reactions.cache // remove reaction from the message
          .find((r) => r.emoji.name == reaction.emoji.name)
          .users.remove(user);
        loggerInfo(
          user.user.username +
            "#" +
            user.user.discriminator +
            ` was given pronoun ${reaction.emoji.name} ${pronouns}`
        );
      } catch (e) {
        console.log(e);
        loggerError(
          user.user.username +
            "#" +
            user.user.discriminator +
            ` was not given pronoun ${reaction.emoji.name} ${pronouns}`,
          e
        );
      }
    }
  }
};

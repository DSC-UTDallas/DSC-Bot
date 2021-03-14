const { logger } = require("./logging.js");

exports.checkPermissions = (msg, role) => {
  var permsAssigned = false;
  try {
    permsAssigned = msg.member.roles.cache.find(
      (r) => r.name.toLowerCase() === role.toLowerCase()
    );
  } catch (e) {
    const author = msg.author.username + "#" + msg.author.discriminator;
    logger.error("Error in checking if " + author + " has role " + role);
    logger.error(e);
  }
  if (permsAssigned) {
    return true;
  } else {
    msg.reply("Access denied to command");
    return false;
  }
};

const Discord = require("discord.js");
const { loggerInfo, loggerError } = require("../utils/logging.js");
const officers = require("../officers.json");

exports.sendInfo = async (client, msg) => {
  try {
    //dev
    const channelID = "756050285842923561";
    //prod
    //const channelID = "841073458719752262";
    const channel = client.channels.cache.get(channelID);

    const about = [
      "Developer Student Club is a university-based community group for students interested in growing as a developer regardless of background and experience. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome. By joining DSC, students grow their knowledge in a peer-to-peer learning environment and build solutions for the local community.",
      "\n",
      "Don't worry if you haven't ever coded before! Most of our workshops are beginner friendly with free resources provided for self-learning, so make sure to check them out on this platform!",
    ];
    const socialMedia = [
      "Mailing List:",
      "<:facebook:841107082840637452> Facebook: https://www.facebook.com/UTDallasDSC",
      "<:instagram:841107082987044925> Instagram: https://www.instagram.com/@utdallasdsc",
      "Email: dscutd@gmail.com",
    ];
    const join = [
      "Sign up at our portal on https://dsc.community.dev/university-of-texas-at-dallas/ to be among the first ones to get information on our upcoming events! You can also attend events from DSC chapters all over the world and connect with fellow event attendees! There might also be something special in store for you in the upcoming semesters for you if you sign up and join events through the portal :eyes:",
      "\n",
      "If you're not sure how to join, view https://www.youtube.com/watch?v=PjWR4xp2bxQ for a step-by-step walkthrough of the sign up process.",
    ];

    const aboutEmbed = new Discord.MessageEmbed()
      .setTitle(
        "<:dsc:643702453585313822> ** About DSC UTD ** <:dsc:643702453585313822>"
      )
      .setColor(0x2b85d3)
      .setDescription(about);
    const mediaEmbed = new Discord.MessageEmbed()
      .setTitle(
        "<:dsc:643702453585313822> ** Follow Us on our Social Media ** <:dsc:643702453585313822>"
      )
      .setColor(0x2b85d3)
      .setDescription(socialMedia);
    const joinEmbed = new Discord.MessageEmbed()
      .setTitle(
        "<:dsc:643702453585313822> ** How to Join Us? ** <:dsc:643702453585313822>"
      )
      .setColor(0x2b85d3)
      .setDescription(join);
    channel.send(aboutEmbed);
    channel.send(mediaEmbed);
    channel.send(joinEmbed);

    msg.react("👍");
    loggerInfo("Club info sent to channel");
  } catch (e) {
    loggerError("Club info could not be sent to channel");
  }
};

exports.sendOfficers = async (client, msg) => {
  try {
    //dev
    const channelID = "756050285842923561";
    //prod
    //const channelID = "843693564650061844";
    const channel = client.channels.cache.get(channelID);

    const embed = new Discord.MessageEmbed()
      .setTitle("Faculty Advisor")
      .setColor(0x2b85d3)
      .setDescription("Dr. Klyne Smith")
      .setThumbnail(
        "https://i0.wp.com/cs.utdallas.edu/wp-content/uploads/2020/03/Klyne-NewHomePage-scaled.jpg?"
      )
      .addFields({
        name: "Know More About Dr. Smith",
        value: "https://cs.utdallas.edu/people/faculty/smith-klyne/",
      });
    channel.send(embed);

    for (index in officers) {
      officer = officers[index];
      const embed = new Discord.MessageEmbed()
        .setTitle(officer.position)
        .setColor(0x2b85d3)
        .setDescription("<@!" + officer.id + ">")
        .setThumbnail(officer.photo)
        .addFields(
          { name: "Major", value: officer.major },
          { name: "Fun Fact", value: officer.fun_fact }
        );
      channel.send(embed);
    }

    msg.react("👍");
    loggerInfo("Officer info sent to channel");
  } catch (e) {
    loggerError("Officer info could not be sent to channel");
  }
};

exports.deleteMessages = async (client, msg) => {
  //dev
  const channelID = "756050285842923561";
  //prod
  //const channelID = "843693564650061844";
  const channel = client.channels.cache.get(channelID);

  const fetched = await channel.messages.fetch();
  await fetched.forEach((message) => message.delete());
  msg.react("👍");
};

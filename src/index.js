const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Channel],
});
require("dotenv").config();

const token = process.env.TOKEN;

const validCategories = [
  "anime",
  "memes",
  "gaming",
  "music",
  "weird",
  "movies",
  "sports",
  "animals",
  "adjectives",
  "fashion & beauty",
  "celebrities",
  "decades",
  "emotions",
  "greetings",
  "holiday",
  "identity",
  "interests",
  "nature",
  "reactions",
  "science",
  "stickers",
  "transportation",
  "tv",
];

const { getRandomGifUrl } = require("./giphyApi");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!look")) {
    const args = message.content.slice("!look".length).trim().split(/ +/);
    const mentionedUser = message.mentions.users.first() || message.author;
    let category = args[1] ? args[1].toLowerCase() : "animal";

    if (!validCategories.includes(category)) {
      category = "animal";
    }

    try {
      const giphyResponse = await getRandomGifUrl(category);
      const imageUrl = giphyResponse.images.original.url;

      const embed = {
        color: 0x0099ff,
        title: `What if ${mentionedUser.username} was in the *${category}* category?`,
        image: {
          url: imageUrl,
        },
      };

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (interaction.commandName === "look") {
    const mentionedUser =
      interaction.options.getUser("user") || interaction.user;
    const category = interaction.options.getString("category") || "animal";

    await interaction.reply(`!look ${mentionedUser} ${category}`);
  }
});

client.login(token);

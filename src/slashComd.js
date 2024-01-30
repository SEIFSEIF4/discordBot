const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const botID = process.env.BOT_ID;
const token = process.env.TOKEN;
const serverID = process.env.SERVER_ID;

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

const rest = new REST({ version: "9" }).setToken(token);
const commands = async () => {
  try {
    await rest.put(Routes.applicationCommands(botID), {
      body: [
        {
          name: "ping",
          description: "Replies with Pong!",
        },
        {
          name: "look",
          description: "Looks at a user",
          options: [
            {
              name: "user",
              description: "The user to look at",
              type: 6,
              required: false,
            },
            {
              name: "category",
              description: "The category to look at",
              type: 3,
              required: false,
              choices: validCategories.map((category) => ({
                name: category.toUpperCase(),
                value: category.toLowerCase(),
              })),
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

commands();

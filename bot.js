const TelegramAPI = require("node-telegram-bot-api");
const express = require("express");
const path = require("path");
const ngrok = require("ngrok");

require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramAPI(token, { polling: true });
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const start = async () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Start the bot",
    },
  ]);

  app.listen(3000, async () => {
    console.log("Server is running on port 3000");
    const publicUrl = await ngrok.connect(3000);
    console.log(`Public URL: ${publicUrl}`);

    bot.on("message", async (message) => {
      const text = message.text;
      const chatId = message.chat.id;

      if (text === "/start") {
        return bot.sendMessage(
          chatId,
          "Hello! Click the button below to open the web app.",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Open Web App",
                    web_app: {
                      url: publicUrl + "/form",
                    },
                  },
                ],
              ],
            },
          },
        );
      }

      if (message?.web_app_data?.data) {
        try {
          const data = JSON.parse(message.web_app_data.data);
          console.log(data);

          await bot.sendMessage(chatId, "Спасибо за обратную связь!");
          await bot.sendMessage(chatId, `Ваша страна: ${data.country}`);
          await bot.sendMessage(chatId, `Ваша улица: ${data.street}`);

          setTimeout(async () => {
            await bot.sendMessage(
              chatId,
              "Всю информацию вы получите в этом чате",
            );
          }, 3000);
        } catch (e) {
          console.log(e);
        }
      }
    });
  });
};

start();

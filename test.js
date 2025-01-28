const TelegramBot = require("node-telegram-bot-api");

const botToken = "7736541730:AAGmkUVe-5jBp86pOoJMDs-nK77267vA1lc";
const bot = new TelegramBot(botToken, { polling: true });

bot.on("message", async (msg) => {
  console.log(`Ваш chatId: ${msg.chat.id}`);
  await bot.sendMessage(msg.chat.id, "Chat ID получен!");
});

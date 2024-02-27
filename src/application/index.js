import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import axios from "axios";
import { validateIPAddress } from "./validateIP.js";
dotenv.config();

const token = process.env.APP_TOKEN; // change to your token
const options = {
  polling: true,
};

const bot = new TelegramBot(token, options);

bot.on("message", async (message) => {
  const chatID = await message.chat.id;
  const text = await message.text;

  if (validateIPAddress(text)) {
    const ress = await axios.get(`http://ip-api.com/json/${text}`);
    bot.sendMessage(
      chatID,
      `Details Location :\nCountry : ${ress.data.country}\nCountry Code : ${
        ress.data.countryCode
      }\nRegion Name : ${ress.data.regionName}\nRegion Code : ${
        ress.data.region
      }\nCity : ${ress.data.city}\nZip : ${ress.data.zip}\nTimezone : ${
        ress.data.timezone
      }\nIsp : ${ress.data.isp}\nOrg : ${ress.data.org}\nAs : ${
        ress.data.as
      }\nQuery : ${
        ress.data.query
      }\nMaps : ${`https://maps.google.com/maps?ll=${ress.data.lat},${ress.data.lon}&z=12&t=h&hl=en-US&gl=US&mapclient=embed`}`
    );
  } else if (text === "/start") {
    bot.sendMessage(
      chatID,
      `Welcome to IP Address checker bot\nplease enter IP Address :`
    );
  } else if (text === "/devhelp") {
    bot.sendMessage(chatID, `1. Rusnanda Purnama - @nodejslovers`); // change to your contact
  } else if (text === "/example") {
    bot.sendMessage(chatID, "192.168.10.1");
  } else {
    bot.sendMessage(chatID, `Invalid IP Address`);
  }
});

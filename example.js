const Discord = require("discord.js");
const client = new Discord.Client();
const puppeteer = require('puppeteer');
require('dotenv').config({path:"./.env"});

const clipeee = {x: 0, y: 0, width: 810, height: 680}

client.on("ready", () =>
{
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on("message", msg =>
{
  if (msg.content === "/lp")
  {
	msg.channel.send('loading...');
	const truc = (async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('https://zeal.gg/wnDrPTx');
		await page.waitForTimeout(1000);
		await page.mouse.click(630, 103)
		await page.waitForTimeout(2000);
		await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, clip:clipeee});
		await browser.close();
	  })();
	msg.channel.send({files:['./screen.jpg']});
    //alert(screenshotTarget);
  }
})

client.login(process.env.CLIENT_TOKEN);
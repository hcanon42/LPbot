const Discord = require("discord.js");
const client = new Discord.Client();
const puppeteer = require('puppeteer');
require('dotenv').config({path:"./.env"});

const clipegang = {x: 0, y: 0, width: 810, height: 680}
const clipsolo = {x: 0, y: 0, width: 800, height: 620}

client.on("ready", () =>
{
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on("message", msg =>
{
	let splitted = msg.content.split(' ');
	if (splitted[0] === "/lp" && splitted.length === 1)
	{
		msg.channel.send('loading LP chart of the gang...');
		const gang = (async () =>
		{
			const browser = await puppeteer.launch({args: ['--no-sandbox']});
			const page = await browser.newPage();
			await page.goto('https://zeal.gg/wnDrPTx');
			await page.waitForTimeout(1000);
			await page.mouse.click(630, 103);
			await page.waitForTimeout(2000);
			await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, clip:clipegang});
			await browser.close();
			await msg.channel.send({files:['./screen.jpg']});
		})();
		//alert(screenshotTarget);
	}
	else if ((splitted[0] === "/lp" && splitted.length > 2) || (splitted.length === 2 && splitted[0] === "/lp" && splitted[1] === "help"))
	{
		msg.channel.send("Correct Format:\n1.  /lp 									 ---> LP Chart of the gang\n2. /lp [Summoner Name] ---> LP Chart of [Summoner Name]");
	}
	else if (splitted[0] === "/lp" && splitted.length === 2)
	{
		msg.channel.send(`loading LP chart of \"${splitted[1]}\"`);
		async function ft_singlesummoner(args)
		{
			const browser = await puppeteer.launch({args: ['--no-sandbox']});
			const page = await browser.newPage();
			await page.goto(`https://zeal.gg/euw/${args}`);
			//await page.waitFor('input[name="summoners"]');
			// await page.$eval('input[name="summoners"]', el => el.value = 'Calport');
			// await page.click('button[tabindex="-1"]')
			await page.waitForTimeout(1000);
			await page.mouse.click(630, 103);
			await page.waitForTimeout(1000);
			await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, clip:clipsolo});
			await browser.close();
			await msg.channel.send({files:['./screen.jpg']});
		};
		ft_singlesummoner(splitted[1]);
	}
})

client.login(process.env.CLIENT_TOKEN);
const Discord = require("discord.js");
const client = new Discord.Client();
const puppeteer = require('puppeteer');
require('dotenv').config({path:"./.env"});

const clipegang = {x: 0, y: 0, width: 810, height: 680}
const clipsolo = {x: 0, y: 0, width: 800, height: 620}

async function ft_multiple_summoners(msg, arguments)
{
	let i = 0;
	let str = '';
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();

	await page.goto('https://zeal.gg');
	await page.waitForTimeout(1000);
	await page.select('select[tabindex="2"]', "euw");
	while (++i < arguments.length)
		str = str.concat(arguments[i] + ((i === arguments.length - 1) ? '' : ', '));
	await page.focus('input[name="summoners"]');
	await page.keyboard.type(str);
	await page.click('button[tabindex="-1"]');
	await page.waitForTimeout(3300);
	await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, fullPage: true});
	await browser.close();
	await msg.channel.send({files:['./screen.jpg']});
}

async function ft_gang(msg)
{
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();

	await page.goto('https://zeal.gg/wnDrPTx');
	await page.waitForTimeout(1200);
	await page.mouse.click(617, 92);
	await page.waitForTimeout(2000);
	await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, clip:clipegang});
	await browser.close();
	await msg.channel.send({files:['./screen.jpg']});
};

async function ft_single_summoner(msg, arg)
{
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();

	await page.goto(`https://zeal.gg/euw/${arg}`);
	await page.waitForTimeout(1000);
	await page.mouse.click(615, 92);
	await page.waitForTimeout(1000);
	await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, clip:clipsolo});
	await browser.close();
	await msg.channel.send({files:['./screen.jpg']});
};


// On ready event
client.on("ready", () =>
{
  console.log(`Logged in as ${client.user.tag}!`)
});


// On message event
client.on("message", msg =>
{
	let splitted = msg.content.split(' ');
	
	// /lp
	if (splitted[0] === "/lp" && splitted.length === 1)
	{
		msg.channel.send('loading LP chart of the gang...');
		ft_gang(msg);
	}
	// /lp help
	else if (splitted.length === 2 && splitted[0] === "/lp" && splitted[1] === "help")
		msg.channel.send("Correct Format:\n1.  /lp 																				 ---> LP Chart of the gang\n2. /lp [Summoner Name1] [Summoner Name2]... ---> LP Chart of [Summoner Name1],[Summoner Name2]...\n3. /lp help		 																---> This message");
	// /lp [summoner name]
	else if (splitted[0] === "/lp" && splitted.length === 2)
	{
		msg.channel.send(`loading LP chart of \"${splitted[1]}\"`);
		ft_single_summoner(msg, splitted[1]);
	}
	// /lp [summoner name1], [summoner_name2]...
	else if (splitted.length > 1 && splitted[0] === '/lp')
	{
		let str = 'loading LP chart of ';
		let	i = 0;

		while (++i < splitted.length)
			str = str.concat(splitted[i] + ((i === splitted.length - 1) ? '' : ', '));
		msg.channel.send(str + '...');
		ft_multiple_summoners(msg, splitted);
	}
});

client.login(process.env.CLIENT_TOKEN);
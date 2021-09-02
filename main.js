import {createRequire} from "module";
const require = createRequire(import.meta.url);
const Discord = require("discord.js");
const puppeteer = require('puppeteer');
const cron = require("cron")
require('dotenv').config({path:"./.env"});

import {ft_single_summoner} from "./commands/single_summoner.js"
import {ft_multiple_summoners} from "./commands/multiple_summoners.js"
import {ft_gang} from "./commands/gang.js"


const guild_id = process.env.GUILD_ID;
const client = new Discord.Client();

function parsing(line)
{
	line = line.replace(/\\ /g, "\\space_detected");
	let splitted = line.split(' ');

	for (let j = 0; j < splitted.length; j++)
	{
		splitted[j] = splitted[j].replace(/\\space_detected/g, ' ')
		splitted[j] = splitted[j].replace(/\\/g, '')
	}
	return (splitted);
}

// On ready event
client.on("ready", () =>
{
	const text_channel = client.channels.cache.find(channel => channel.name === "bot");

	console.log(`Logged in as ${client.user.tag}!`)

	let scheduledlp = new cron.CronJob("00 00 18 * * *", () =>
	{
		text_channel.send('loading LP chart of the gang...');
		ft_gang(text_channel);
	})
	scheduledlp.start()});

// On message event
client.on("message", msg =>
{
	let splitted = parsing(msg.content);
	
	// /lp
	if (splitted[0] === "/lp" && splitted.length === 1)
	{
		msg.channel.send('loading LP chart of the gang...');
		ft_gang(msg.channel, 0);
	}

	// /lpmax
	else if (splitted[0] === "/lpmax" && splitted.length === 1)
	{
		msg.channel.send('loading LP chart of the gang...');
		ft_gang(msg.channel, 1);
	}

	// /lp help
	else if (splitted.length === 2 && splitted[0] === "/lp" && splitted[1] === "help")
		msg.channel.send("Correct Format:\n1.  /lp 																				 ---> LP Chart of the gang\n2. /lp [Summoner Name1] [Summoner Name2]... ---> LP Chart of [Summoner Name1],[Summoner Name2]...\n3. /lp help		 																---> This message\n4. /lpmax 		 																---> lpmax can be used instead of lp keyword to see max history available.");
	
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
		ft_multiple_summoners(msg, splitted, 0);
	}

	// /lpmax [summoner name1], [summoner_name2]...]
	else if (splitted.length > 1 && splitted[0] === '/lp')
	{
		let str = 'loading LP chart of ';
		let	i = 0;

		while (++i < splitted.length)
			str = str.concat(splitted[i] + ((i === splitted.length - 1) ? '' : ', '));
		msg.channel.send(str + '...');
		ft_multiple_summoners(msg, splitted, 1);
	}
});

client.login(process.env.CLIENT_TOKEN);

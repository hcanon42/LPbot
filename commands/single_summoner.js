import {createRequire} from "module";
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const clipsolo = {x: 0, y: 0, width: 800, height: 620}

export async function ft_single_summoner(msg, arg)
{
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();

	try
	{
		page.setDefaultNavigationTimeout(10000);
		await page.goto(`https://zeal.gg/euw/${arg}`);
		await page.waitForTimeout(1300);
		await page.mouse.click(615, 92);
		await page.waitForTimeout(2500);
		await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, fullPage:true});
		await browser.close();
		await msg.channel.send({files:['./screen.jpg']});
	}
	catch (error)
	{
		console.log("Error has occured:\n", error);
	}
};

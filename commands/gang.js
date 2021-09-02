import {createRequire} from "module";
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const clipegang = {x: 0, y: 0, width: 810, height: 700}

export async function ft_gang(channel, max)
{
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();

	try
	{
		page.setDefaultNavigationTimeout(10000);
		await page.goto('https://zeal.gg/HkPbJ_5');
		await page.waitForTimeout(1500);
		await page.mouse.click(617, 92);
		await page.waitForTimeout(3500);
		if (max == 1)
		{
			await page.mouse.click(750, 92);
			await page.waitForTimeout(3500);
		}
		await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, fullPage: true});
		await browser.close();
		await channel.send({files:['./screen.jpg']});
	}
	catch (error)
	{
		console.log("Error has occured:\n", error);
	}
};

// module.exports = 
// {
// 	slash: true,
// 	testOnly: true,
// 	descrition: 'Shows a graph that represents the evolution the LPs of the reformed gang during the last weeks.',
// 	callback: ({}) =>
// 	{
// 		return ('gang_command');
// 	}
// }

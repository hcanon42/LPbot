import {createRequire} from "module";
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

export async function ft_multiple_summoners(msg, argumentss)
{
	let i = 0;
	let str = '';
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();

	try
	{
		page.setDefaultNavigationTimeout(2000);
		await page.goto('https://zeal.gg');
		await page.waitForTimeout(1000);
		await page.select('select[tabindex="2"]', "euw");
		while (++i < argumentss.length)
			str = str.concat(argumentss[i] + ((i === argumentss.length - 1) ? '' : ', '));
		await page.focus('input[name="summoners"]');
		await page.keyboard.type(str);
		await page.click('button[tabindex="-1"]');
		await page.waitForTimeout(3300);
		await page.screenshot({ type: "jpeg", path: 'screen.jpg', quality: 100, fullPage: true});
		await browser.close();
		await msg.channel.send({files:['./screen.jpg']});
	}
	catch (error)
	{
		console.log("Error has occured:\n", (error));
	}
};

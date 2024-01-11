import puppeteer from 'puppeteer';

// We will presumably want to read from a csv
const lastNames = ["stewart", "st*", "smith"];

// Open the installed Chromium. We use headless: false
// to be able to inspect the browser window.
const browser = await puppeteer.launch({
    headless: false
});

// Open a new page / tab in the browser.
const page = await browser.newPage();

// Tell the tab to navigate to the JavaScript topic page.
await page.goto('https://dajd-jms.powerappsportals.us/public/subject-lookup/');

for (const lastName of lastNames) {

    page.waitForSelector("input[name='0']");

    await page.$eval("input[name='0']", el => el.value = '');
    await page.type("input[name='0']", lastName);

    //Wait a second before hitting submit, as was sometimes submitting before name in
    await new Promise(r => setTimeout(r, 1000));

    await page.click('.btn-entitylist-filter-submit');

    await new Promise(r => setTimeout(r, 1000));

    console.log("-------------------");
    console.log("Searched for last name: " + lastName);
    try {
	let results = await page.$eval('table tbody', tbody => [...tbody.rows].map(r => [...r.cells].map(c => c.innerText)))

	console.log("Result count: " + results.length);
	results.map(row => {
	    console.log("Name: " + row[1] + " Facility: " + row[3] + " Arresting Agency: " + row[4]);
	});
    } catch {
	console.log("No results found.")
    }
    await new Promise(r => setTimeout(r, 1000));

}

// Pause for 5 seconds, to see what's going on.
await new Promise(r => setTimeout(r, 5000));

// Turn off the browser to clean up after ourselves.
await browser.close();

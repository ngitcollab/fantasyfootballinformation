const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({Referer: 'https://sparktoro.com/'}) 
  await page.goto('https://teamrankings.com/nfl/stat/opponent-rushing-yards-per-game');
  await page.waitForSelector('tr.even a,tr.odd a');
  const bottom10run = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('tr.even a,tr.odd a'))
    // return links.map(link => link.href).slice(23, 32)
    return links.map(link => link.textContent).slice(23, 32)
  })

  
  await page.goto('https://www.teamrankings.com/nfl/stat/opponent-passing-yards-per-game');
  await page.waitForSelector('tr.even a,tr.odd a');  
  const bottom10pass = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('tr.even a,tr.odd a'))
    // return links.map(link => link.href).slice(23, 32)
    return links.map(link => link.textContent).slice(23, 32)
  })


  console.log("\n\n\n")  
  console.log("The bottom 10 teams agains the run:")
  console.log(bottom10run)


  console.log("\n\n\n")  
  console.log("The bottom 10 teams agains the pass:")
  console.log(bottom10pass)


  console.log("\n\n\n")  
  await browser.close()
})();
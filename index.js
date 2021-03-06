const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://www.flickr.com/search/?text=OrCam%20MyEye');

  // Extracting image urls from single flickr url
  const hrefs1 = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('a[href]'),
      a => a.getAttribute('href')
    )
  );

  var image_ref_array = [];

  hrefs1.forEach(e =>{
      if (e.length === 29){
        // console.log(e);
        image_ref_array.push(e);
      }
  })
    
  console.log("Length = "+image_ref_array.length);

  // goToImagePage(image_ref_array[0], browser);

  const page1 = await browser.newPage();

  const img_url = await image_ref_array[2];
  const url = await 'https://www.flickr.com'+img_url;

  console.log(url);

  await page1.goto(url);

  // Get number of views
  const views  = await page1.evaluate(() => document.querySelector('.view-count-label').innerText);
  console.log(`number of views: ${views}`);

  // Get number of faves
  const faves  = await page1.evaluate(() => document.querySelector('.fave-count-label').innerText);
  console.log(`number of faves: ${faves}`);

  // Get number of comments
  const comments  = await page1.evaluate(() => document.querySelector('.comment-count-label').innerText);
  console.log(`number of comments: ${comments}`);

  browser.close();

})();

import * as playwright from "playwright";
import { getHtml } from "./util/template";
import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getLastUpdate,
  getDailyCases,
} from "./util/api";
import { writeTempFile, pathToFileURL } from "./util/file";
export async function og() {
  try{
    const [
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      dailyCases,
    ] = await Promise.all([
      getTotalConfirmed(),
      getTotalRecovered(),
      getTotalDeaths(),
      getLastUpdate(),
      getDailyCases(),
    ]);
  
    const html = getHtml({
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      dailyCases,
      width: 1200,
      height: 600,
    });
    const text = "textwoot";
    const filePath = await writeTempFile(text, html);
    const fileUrl = pathToFileURL(filePath);
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(fileUrl);
    await page.screenshot({ path: `og.png` });
    await browser.close();
    return true
  }catch(e){
    console.log(e.message)
    return false
  }
  
}


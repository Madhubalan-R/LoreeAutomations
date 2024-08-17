import { Given, When, Then} from "@cucumber/cucumber";
import { Page, chromium } from "playwright";
import * as dotenv from "dotenv";
import { expect } from "playwright/test";
import { FrameContent } from "../features/provider";

let page: Page;
dotenv.config();

Given('user on the Loree homepage',{timeout: 120000}, async function () {
    const  browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(FrameContent.AdminPageUrl);
    
  });
  When('user enter the username', async function () {
    const username = process.env.USER_NAME;
    await page.getByRole("textbox",{name: "Email"}).fill(username || "");
    
  });

  When('user enter the password', async function () {
    const password = process.env.USER_PASSWORD;
    await page.getByRole("textbox",{name:"Password"}).fill(password || "");

  });

  When('user click on the Login button',{timeout: 30000}, async function () {
    await page.click("input[type='submit']");
  });

  Then('Login should be success', {timeout: 30000},async function () {
    const title = await page.title();
    expect(title).toBe('Loree 2.0 New Dev');  
  });
  Given('user on the Loree landing page', {timeout: 120000},async function () {
    await page.goto(FrameContent.AdminPageUrl);
  });

   When('user click the Admin button and click on Roles and Features', {timeout: 120000},async function () {
    const iframeLocator = page.locator(FrameContent.iframeXpath).contentFrame();
    await iframeLocator.locator(FrameContent.adminXpath).click();
    await iframeLocator.locator(FrameContent.featuresXpath).click();
  });
  
    Then('user should see the advance checkbox is checked',{timeout: 120000}, async function () {
      const iframeLocator = page.locator(FrameContent.iframeXpath).contentFrame();
      const check = await iframeLocator.locator(FrameContent.advancedCheckbox).isChecked();
      if(!check){
        await iframeLocator.locator(FrameContent.advancedCheckbox).click();
      }
 });
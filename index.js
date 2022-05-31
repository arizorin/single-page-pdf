const puppeteer = require("puppeteer");
const { Command } = require("commander");

let browser;

const generatePdf = async (fileName, offset, isMultiplePage, isTransparent) => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--allow-file-access-from-files", "--enable-local-file-accesses"],
  });

  const page = await browser.newPage();

  await page.goto(`file://${__dirname}/input/${fileName}`);

  if (!isMultiplePage) {
    const { width, height } = await page.evaluate(() => {
      return {
        width: document.scrollingElement.scrollWidth,
        height: document.scrollingElement.scrollHeight,
      };
    });

    await page.addStyleTag({
      content: `@page { size:${width}px ${
        height + offset
      }px; margin: 0; padding: 0;} body { margin: 0;}`,
    });
  }

  if (isTransparent) {
    await page.evaluate(() => {
      document.body.style.background = "transparent";
    });
  }
  const path =`./output/${fileName}.pdf`
  await page.pdf({
    path,
    printBackground: true,
    displayHeaderFooter: false,
    preferCSSPageSize: true,
  });

  return path
};

const app = new Command();
app
  .name("single-page-pdf")
  .description("CLI for converting HTML to PDF")
  .version("0.0.1");

app
  .command("parse")
  .description("Transform html file to a single pdf page")
  .argument("<fileName>", "filename with extension in input folder")
  .option("-o, --offset <number>", "custom offset for height", "0")
  .option("-m, --multi <0 | 1>", "multiple page flag", "0")
  .option("-t, --transparent <0 | 1>", "transparent page flag", "0")
  .action((fileName, { offset, multi, transparent }) => {
    generatePdf(fileName, Number(offset), Number(multi), Number(transparent))
      .then((filePath) =>
        console.log(
          "File successfully converted ☺️",
          `Location:  ${filePath}`
        )
      )
      .catch((err) => {
        console.error("Error converting file:", err);
      })
      .finally(async () => {
        if (browser) {
          await browser.close();
        }
      });
  });

app.parse();

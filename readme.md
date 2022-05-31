# Create single file PDF from HTML
This is a ready to use JS script for converting HTML pages to a signle PDF file (as like on Safari).
There are also several flags to help you get your pdf converted correctly:
- "multi" - split pdf to multiple pages
- "transparent" - remove background color
- "offset" - adds height to result pdf page

P.S You can also run ```node index.js parse help``` to get more info about available commands.

## Installation
Script requires [Node.js](https://nodejs.org/) v16+ to run.
Create input and output folders. Install the dependencies and devDependencies and start the script.
```sh
mkdir input output
npm i
node index.js parse FILE_NAME.PDF
```

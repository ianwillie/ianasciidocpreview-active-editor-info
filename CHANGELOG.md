# Changelog

- just some dates with what was altered. As yet no versioning because [roject is inearly development.]

## 20240131
Write standalone asciidoctor.js output so that css attributes defined in .adoc can be extracted & injected into generated html head  NB NB ata kater date!
written to temp/htmloutputFileRawFromAsciidocStandalone.html
    fs.writeFileSync(htmloutputDir + htmloutputFileRawFromAsciidocStandalone, htmloutputStandalone);
    console.log(`Just written htmloutputFileRawFromAsciidocStandalone = ${htmloutputFileRawFromAsciidocStandalone}` );

atom-browser.less missing colsole. message sorted.
Link below removed from ...view file. atom-browser was explored to loo at its interesting Zoom bar.
Removed from lib/...view.js: hN +=   `    <link rel="stylesheet" href="/home/ian/.pulsar/packages/ianasciidocpreview-active-editor-info/styles/atom-browser.less">\n` ;

## 20240128
   openBrowserPopup  ,/temp/<filename> in place of ians local full path
    missed /...bin/falkon  - corrected.

  navigator.clipboard.writeText("./temp/iansasciidocpreviewhtmloutput.html")  instead of ians local path to file.

## 20231224

Latest update with Ctrl-Alt-Shft-F to open external Falkon browser which gives a realistic working version of adoc file and a refresh when file is saved.

## 20231128

Just pushed the latest update that gets Zoom In/Out working without spawning huge numbers of unnamed text files in pulsar.

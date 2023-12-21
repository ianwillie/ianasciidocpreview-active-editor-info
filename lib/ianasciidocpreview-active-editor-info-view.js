// @flow
'use babel';
 /* jshint esversion: 6 */
 // File: /media/AcerWinData/github_from_home/CloneOfianasciidocpreview-active-editor-info-20230915_ChromeZoomWiTransformFactorInFile/lib/ianasciidocpreview-active-editor-info-view.js
 // from /media/AcerWinData/github_from_home/CloneOfianasciidocpreview-active-editor-info-20230731_ZoomTransformFactorInFile/lib/ianasciidocpreview-active-editor-info-view.js
// cf /home/ian/github/ianasciidocpreview-active-editor-info-202304031546/lib/ianasciidocpreview-active-editor-info-lib-202304031546_completeLatest.txt   for details to find error that made preview not change wi edited file

// set consprint to true or false to control whether console.log output is generated
var consprint = false;
const path = require("path"); const fs =  require("fs");

// from https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
function sizes() {
  const contentWidth = [...document.body.children].reduce(
    (a, el) => Math.max(a, el.getBoundingClientRect().right), 0)
    - document.body.getBoundingClientRect().x;

  return {
    windowWidth:  document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
    pageWidth:    Math.min(document.body.scrollWidth, contentWidth),
    pageHeight:   document.body.scrollHeight,
    screenWidth:  window.screen.width,
    screenHeight: window.screen.height,
    pageX:        document.body.getBoundingClientRect().x,
    pageY:        document.body.getBoundingClientRect().y,
    screenX:     -window.screenX,
    screenY:     -window.screenY - (window.outerHeight-window.innerHeight),
  }
}

function show() {
  console.log("sizes=" + sizes());
}

/* body { margin: 0 }.box { width: 3000px; height: 4000px; background: red; }
<div class="box">
  CAUTION: stackoverflow snippet gives wrong values for screenX-Y,
  but if you copy this code to your page directly the values will be right<br>
  <button onclick="show()" style="">CALC</button>
</div> */

export default class IanasciidocpreviewActiveEditorInfoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('ianasciidocpreview-active-editor-info');

    if (consprint)  console.log('l16 this='); console.log(this);
    // Create message element from original
    //const message = document.createElement('div');
    const  message = document.createElement('div'); //cont changed to let
    message.classList.add('message');  //required to allow CSS attributes to it
    //this.element.appendChild(message);  //message will be appended later

  this.subscriptions = atom.workspace.observeActiveTextEditor(editor => {   //Choosen working alternative
  //this.subscriptions = atom.workspace.open(editor => {   //Testing open

  // open editor on Line 1  - NB not preview pane.
  //atom.workspace.open(editor,  { initialLine: 1 });  // opens .adoc file at c l29 NOT Preview.

  // However, atom.workspace.open("atom://ianasciidocpreview-active-editor-info",  { initialLine: 33 });  // Has no effect - must be "editor" here.
  console.table( "editor=" + String(editor));

  // #################   LOK AT THIS #########################
          console.table("atom.workspace.getPaneItems()=" + atom.workspace.getPaneItems());

          atom.workspace.getPaneItems().forEach((element) => {    console.log(element); });

          console.log('l34 this='); console.log(this); console.log ("editor="); console.log( editor );

    var fileExtensions = [".adoc", ".asciidoc", ".ad", ".asc", ".txt"];
    if (typeof editor === "undefined" || editor === null) { return };

    let onSaveDisposable;
    onSaveDisposable = editor.onDidSave(function(){
      if (consprint)  console.log("l40 typeof(editor)=" + typeof(editor));
      //this.element.appendChild(getTextOpenWrite());  //return message TypeError: Cannot read property 'element' of undefined
      if (typeof editor !== "undefined" && editor !== null) {  //editor must be defined or getType > error
        let ext = path.extname(editor.getPath()); //if not asciidoc file then ignore
        if ( fileExtensions.includes(ext)) {
          getTextOpenWrite();  // must have adoc type extension
        }
      };
    }); //END editor.onDidSave

      /* https://stackoverflow.com/questions/64543501/dispatching-commands-sequentially-on-file-save-coffee-init
      atom.workspace.observeTextEditors(editor => {
        return editor.onDidSave(async () => {
          const view = atom.views.getView(atom.workspace.getActiveTextEditor());
          await atom.commands.dispatch(view, 'platformio-ide-terminal:insert-custom-text-1');
          await atom.commands.dispatch(view, 'platformio-ide-terminal:insert-custom-text-2');
        });
      }); */

    function getAsciidoctorCssPath() {
      const path = require("path"); const fs = require("fs");
      let asciidoctorCssPath = path.resolve( "asciidoctor.css"); //create absolute path path.resolve( "asciidoctor.css");  OR "asciidoctorTEST.css"
      const asciidoctorCssWeb = "https://raw.githubusercontent.com/asciidoctor/asciidoctor/v2.0.x/src/stylesheets/asciidoctor.css";
      if (consprint)  console.log("asciidoctorCssPath=" + asciidoctorCssPath);
      // error correction - checking for css local or getting web file does not work
      //let stats = fs.statsSync.isFile(asciidoctorCssPath);
      //if (!fs.statSync.isFile(asciidoctorCssPath)) {asciidoctorCssPath = asciidoctorCssWeb}; // if local .css not exist get web version
      return asciidoctorCssPath;
    } //END getUrlForAsdiidoctorCss() */

    function getTextOpenWrite() {   // function getTextOpenWrite()
      let asciidocInputFromEditor_words = editor.getText(); // .words = entire text content of adoc file from editor
                  if (consprint)   console.log('editor.getText=\n' + typeof(editor.getText()));

      let htmloutputFile = 'temp/iansasciidocpreviewhtmloutput.html'; let htmloutputDir = "./"; // append / html file with head etc added by getTextOpenWrite.js
      let htmloutputFileRawFromAsciidoc = 'temp/htmloutputFileRawFromAsciidoc.html';  // file from asciidoctor.js without head etc wich will be added by getTextOpeWrite
      let htmloutPath = path.resolve( htmloutputFile); console.log("htmloutPath=\n" + htmloutPath); // dir path for above files
      let transformScaleFile = 'temp/iansasciidocpreviewtransformscale.txt'; // Zoom in/out transformScale added to this file after keyboard Ctrl-Shift-Alt-+ or -

      let transformscaleDir = "./";
      let transformScalePath = path.resolve( transformScaleFile);
      console.log("transformScalePath=\n" + transformScalePath);



      // check file.ext is asciidoc type or txt  ALL CHECKED ABOVE IF statement
      const Asciidoctor = require('asciidoctor')();
      const asciidoctor = Asciidoctor();  //cf https://docs.asciidoctor.org/asciidoctor.js/latest/setup/install/
      // convert asciidocInputFromEditor_words asciidoc string  to html with Asciidoctor.js
      // cf https://docs.asciidoctor.org/asciidoctor.js/latest/processor/convert-options/
      // read about document attributes on asciidoctor.org/docs/user-manual/#attribute-catalog
      // htmloutput (standalone) is a complete web page wi <!DOCTYPE html>, html, head, <body class="article"> correct to end

      let htmloutput = Asciidoctor.convert(asciidocInputFromEditor_words, {'attributes': { 'linkcss':  true , sourcemap: true }}); //, { standalone: true }); , sourcemap: true// Works with Asciidoctor NOT asciidoctor
      //let htmloutput = Asciidoctor.convert(asciidocInputFromEditor_words, { 'attributes': { 'linkcss': true ,  'standalone': true }}); // Works with Asciidoctor NOT asciidoctor

      //let htmloutput = Asciidoctor.convert(asciidocInputFromEditor_words, {'attributes': {  'safe': 'safe'}}); // safe: safe to use inline style syntax incorrect

        fs.writeFileSync(htmloutputDir + "temp/XXXasciidocInputFromEditor_words", asciidocInputFromEditor_words);  // file with original .adoc which is in string words the original asciidoc file - just to check

      // write out raw file created by asciidoctor.js that can be read by browser
      fs.writeFileSync(htmloutputDir + htmloutputFileRawFromAsciidoc, htmloutput);
      console.log(`Just written htmloutputFileRawFromAsciidoc = ${htmloutputFileRawFromAsciidoc}` );


      // NB height must be given in px or no vert scrolling. Arrow keys work but not PgUp & PgDown
      // width should not be present & can be dragged wider. If specified, say 30% will be % of the active editor panel not total pulsar size
      let asciidocUrl =  atom.workspace.getActiveTextEditor().getTitle();  console.log('asciidocUrl =\n' + asciidocUrl);
      // NB NB asciidocUrl is what I want to be the title of the preview pane. How to do that?

      // this is needed or pane contents does not show
      let asciidocUrlHref = '<a href="' + htmloutPath + '" >' +    asciidocUrl + '</a>'; console.log('asciidocUrlHref =\n' + asciidocUrlHref);

       // scroll styleing on body givesno scrollbars but it does on div within body.
       // NB <hr> color v difficult to style so don't use

      //get size of the total atom Window
      let atomGetSizeHeight = atom.getSize().height;//size of total atom Window
      let atomGetSizeWidth = atom.getSize().width;// How to find ht/w PreviewPane??

      const previewPaneHeightDefault = 1001;
      const previewPaneWidthDefault = 400;  //see later  for proper assignment
      let previewPaneWidth;
      let transformScale;  // Zoom transformScale
      const zoomScaleDefault = 1.20;

      // read zoom transform factor asynchronously cf Flannagan p605
          //fs.readFileSync(htmloutputDir + htmloutputFile, newhtmloutput);
      try {
        transformScale = fs.readFileSync(transformscaleDir + transformScaleFile, {encoding:'utf8' });
        transformScale = transformScale.asFixed(2);
        // if (transformScale < 0.5 or gt 3 say do nothing???
        return transformScale;
      } catch (err) {
        if (err.code === 'ENOENT') {  //file does not exist
          console.log( 'File not found');  // create wi default
          fs.writeFileSync(transformscaleDir + transformScaleFile, String(zoomScaleDefault.toFixed(2)));
        }
      };
      if (isNaN(transformScale)) {transformScale = zoomScaleDefault};


      let windowInnerWidth = window.innerWidth;
      let windowInnerHeight = window.innerHeight;
      let previewHeight = (windowInnerHeight / transformScale).toFixed(2);

      //previewPaneWidth  = (100/transformScale).toFixed(2);  // width will follow dragged width wi 100%
      //previewPaneWidth  = (100).toFixed(2);
      previewPaneWidth  = (100 * transformScale).toFixed(2);
               if (consprint) {console.log(transformScale); console.log(previewHeight); console.log(previewWidth); }

      console.log(`transformScale = ${(Number(transformScale)).toFixed(2)} \n
        previewHeight= ${previewHeight} px  previewPaneWidth= ${previewPaneWidth} \n
        atomGetSizeHeight atom.getSize().height = ${atomGetSizeHeight} atomGetSizeWidth atom.getSize().width; = ${atomGetSizeWidth} \n
        windowInnerHeight window.InnerHeight = ${windowInnerHeight}
          windowInnerWidth window.innerWidth = ${windowInnerWidth}`);

      /*  zoomButtonsHtml  NOT USED
      let zoomButtonsHtml = `<div style="text-align: left;">transformScale = "${(Number(transformScale)).toFixed(2)}" previewHeight="${previewHeight}"px  previewPaneWidth= ${previewPaneWidth} <br>
        atomGetSizeHeight atom.getSize().height = "${atomGetSizeHeight}" atomGetSizeWidth atom.getSize().width; = "${atomGetSizeWidth}" <br>
        windowInnerHeight window.InnerHeight = "${windowInnerHeight}"
          windowInnerWidth window.innerWidth = "${windowInnerWidth}"<br>
          12345678911234567892123456789312345678941234567895123456789612345678971234567898123456789912345678901234567891123456789212345678931234567894123456789512345678961234567897123456789812345678991234567890<br>
          0........1.........2.........3.........4.........5.........6.........7.........8........9.........10........11........12........13........14........15........16........17........18........19........20

        </div>`;  */

          //let mypath = "/media/something/source/Paisley/filename.html.erb.adoc";
          console.log("editor.getPath()=" , editor.getPath());

            consprint = true;
            let mypath = editor.getPath();      if (consprint)  console.log("typeof(mypath)=" + typeof(mypath));
            let myindex = mypath.lastIndexOf("/source/");       if (consprint)  console.log("myindex =" + myindex);
            mypath = mypath.substr(mypath.lastIndexOf("/source/") + 8);
            if (consprint)  console.log(" mypath.substr(mypath.lastIndexOf('/source/') + 8)=" + mypath);
            let firstdot = mypath.indexOf(".");  if (consprint)  console.log("firstdot=" + firstdot);
            mypath = mypath.substring(0, mypath.indexOf(".")); if (consprint)  console.log(mypath);
            mypath =  "http://192.168.0.10:4567/" + mypath + ".html";      if (consprint)   console.log(mypath );
            // mypath =  "file:///media/AcerWinData/github_from_home/CloneOfianasciidocpreview-active-editor-info-20230915_ChromeZoomWiTransformFactorInFile/temp/iansasciidocpreviewhtmloutput.html"; // pulsar cannot open this even though browser can
            consprint = false;

                //path.parse('/home/user/dir/file.txt');
                // Returns:
                // { root: '/',
                //   dir: '/home/user/dir',
                //   base: 'file.txt',
                //   ext: '.txt',
                //   name: 'file' }

        //for full geometry & sizes cf stackoverflow.com/questions/3437786/  #66 2020 & 2021
        // https://i.stack.imgur.com/cERBs.png  shows image of a page

      if (consprint)  console.log(sizes());

      let TestWindowHeight  = windowInnerHeight / transformScale * 0.90; // windowInnerWidth works but shrinks on Zoom

      let newhtmloutput =  // from en of markdow-preview-view.js The new page to be rendered in html
       `\
       <!DOCTYPE html> \n ` +
       //`<html style=" transform-origin: 0 0; overflow-y: scroll; overflow-x: scroll;transform: scale(${transformScale});  height: ${previewHeight}px; width: ${previewPaneWidth}% ;" > ` +
       `<html> \n` +
        `<head>
          <meta charset="utf-8" />
          <title> ${asciidocUrl} Preview </title>
          <style> MyStyle </style>
          <link rel="stylesheet" href="${getAsciidoctorCssPath()}"> ` +
          `<link rel="stylesheet" href="/home/ian/.pulsar/packages/ianasciidocpreview-active-editor-info/styles/atom-browser.less">\n` +

        `</head> \n` +
        //<body class="article"  > //no class article in css
        `<body  style="padding: 0; margin: 0; border: 0;"> ` +


        //` <div id="insideBody" style="height: ${previewHeight}px;  overflow-y: scroll; overflow-x: scroll; transform-origin: 0 0;  zoom: ${transformScale};">` +

        //`<div id="insidebody" style=" zoom: ${transformScale}; height=1001px; overflow-y: scroll; overflow-x: scroll;"  > ` +


          /*`<hr>
          <section>
            <h1>Website</h1>
          </section> \n`+
          zoomButtonsHtml + `<hr>\n` + */

          //` <div id="insideBody" style="height: ${previewHeight}px; width: 100%; overflow-y: scroll; overflow-x: scroll; transform-origin: 0 0; transform: scale(${transformScale}); zoom: 2;">` +

          /*` <div id="insideBody" style="height: ${previewHeight}px; width: ${previewPaneWidth}%; overflow-y: scroll; overflow-x: scroll; transform-origin: 0 0; transform: scale(${transformScale}); ">` + */

          /*` <div id="insideBody" style=" transform-origin: 0 0; overflow-y: scroll; overflow-x: scroll;transform: scale(${transformScale});
              height: ${previewHeight}px; width: ${previewPaneWidth}% ; ">` + */

             // ` <div id="insideBody" style=" transform-origin: 0 0; overflow-y: scroll; overflow-x: scroll;transform: scale(${transformScale});
             //       height: ${previewHeight}px; width: ${previewPaneWidth}% ; ">` +

          /*`<div>
            <h2>Asciidoctor.js rendering of ${asciidocUrl}  </h2><br>
            <p>Stylesheet is ${getAsciidoctorCssPath()}
            to see in browser open:  ${htmloutPath} <br>
            <a href="${htmloutPath}" > ${htmloutPath} </a> <br>
            ${asciidocUrlHref}    <br>
             Drag edge to extend to L. Height cannot be altered. <hr>
          </div>` + */
          //<div class="article">  ${htmloutput} </div> // no class article in css

            /*`<div id="divForHtmloutput" style="transform-origin: 50% 50%;display: block;  height: ${windowInnerHeight}px;   overflow-x: scroll;   padding: 0; margin: 0; border: 0; zoom: ${transformScale};">
              ${htmloutput}
            </div> ` + */

            /* transform-origin 50% 50% is essential for panning to work correctly, with 0 0 there is a blank space to R on pan L */
            `<div id="divForHtmloutput" style="transform-origin: 50% 50%;display: block;  height: ${TestWindowHeight}px;   overflow-x: scroll;   padding: 0; margin: 0; border: 0; zoom: ${transformScale};">` +

            `<div style="text-align: left; color: green;">  Zoom = "${(Number(transformScale)).toFixed(2)}" </div>` +

            //`<a href=${mypath}>${mypath}</a>` +

            'To browse in Firefox:   Ctrl-Alt-Shft-F  <hr>\n'  +

            // href="#mytarget" & name=value1 do nothing in Pulsar
            //`<br><a href="#mytarget">TEST Click here to jump to href=#mytarget</a> \n` +
            //`<br><a href="value1">TEST Click here ot jump to name=value1</a>` +
              //`${TESTzoomButtonsHtml}` +   // do nothing in pulsar

              `${htmloutput} \n` +

              `<a name="value1"></a><span name="value1"></span> \n` +
              `<div id="mytarget">This is div id=mytarget.</div > \n` +
            `</div> ` +
          //`</div>` +  // END div insideboady
        `</body>
      </html>` + `\n`;// ensure trailing newline. Same at start of newhtmloutput string.
                      if (true)  console.log('l75 newhtmloutput=\n' + newhtmloutput );
       // Create message element from original   FROM ABOVE
       //const message = document.createElement('div');  //needs to be created above so that preview changes as different .adoc files opened in editor.

       /////////////////////////////////////////////////////////////////////
       let newhtmloutputNEW =  "";// from en of markdow-preview-view.js The new page to be rendered in html
       let hN = "";
       hN +=  `\n<!DOCTYPE html> \n ` +  `<html> \n` ;
       hN +=   `  <head>\n`;
       hN +=   `    <meta charset="utf-8" />\n`;
       //hN +=   `    <meta http-equiv="refresh" content="5" >\n`;  // refresh content every 5 secs BUT RELOADS preview pane too!!!
       hN +=   `    <title> ${asciidocUrl} Preview </title>\n`;
       hN +=   `    <style> MyStyle </style>\n`;
       hN +=   `    <link rel="stylesheet" href="${getAsciidoctorCssPath()}">\n`;
       hN +=   `    <link rel="stylesheet" href="/home/ian/.pulsar/packages/ianasciidocpreview-active-editor-info/styles/atom-browser.less">\n` ;
       hN +=   `  </head> \n`;
         //<body class="article"  > //no class article in css
       hN +=   `  <body  style="padding: 0; margin: 0; border: 0;">\n`;

       hN +=   `    <div id="divForHtmloutput" style="transform-origin: 50% 50%;display: block;  height: ${TestWindowHeight}px;   overflow-x: scroll;   padding: 0; margin: 0; border: 0; zoom: ${transformScale};">\n` ;

       hN +=   `      <div style="text-align: left; color: green;">  Zoom = "${(Number(transformScale)).toFixed(2)}" </div>\n` ;

         //`<a href=${mypath}>${mypath}</a>` +

       hN += '        To browse in Firefox:   Ctrl-Alt-Shft-F  <hr>\n' ;

         // href="#mytarget" & name=value1 do nothing in Pulsar
         //`<br><a href="#mytarget">TEST Click here to jump to href=#mytarget</a> \n` +
         //`<br><a href="value1">TEST Click here ot jump to name=value1</a>` +
           //`${TESTzoomButtonsHtml}` +   // do nothing in pulsar

       hN +=  `${htmloutput} \n` ;
       hN +=  "              htmloutput  goes here #######################\n";
       hN +=   `      <a name="value1"></a><span name="value1"></span> \n`;
       hN +=   `      <div id="mytarget">This is div id=mytarget.</div > \n`;
       hN +=   `    </div>\n ` ; //END div id="divForHtmloutput"
       //`</div>` +  // END div insideboady
       hN +=   `  </body>\n</html>\n`;// ensure trailing newline. Same at start of newhtmloutput string.
       hN +=   `http://localhost:35729/livereload.js\n`    // required by pulsar/atom livereload
       console.log("hN=\n" + hN);
       /////////////////////////////////////////////////////////////////////
newhtmloutput = hN;
       ///////////////////////////////////////////////////////////////////




        if (consprint) console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQ message div =\n' + message);
       message.innerHTML = htmloutput;
       let contents = message.innerHTML;  // without .innerHTML only displays [object HTMLDivElement ]
                    if (consprint) console.log(`l81 contents=\n` + contents);
       message.innerHTML = newhtmloutput;
                     if (consprint) console.log(`l 120 RRRRRRRRRRRRRRRRRRR  newhtmloutput message=\n` + message);


        // NB NB this.element = document.createElement('div');
        // document.getElementById('someId').innerHTML = "Click The Button Above To See Your Job!";
        //(YYYelement.replaceWith(message));  //Works but ERROR ncaught (in promise) TypeError: YYYelement.replaceWith is not a function
       //YYYelement.appendChild(message);  //this  WORKS & scrollbars work too.  Creates ERROR but seems to work
       //Uncaught (in promise) TypeError: YYYelement.appendChild is not a function
       //cf https://stackoverflow.com/questions/23673905/appendchild-is-not-a-function-javascript

       contents = message.innerHTML;
                    if (true) console.log(`l127 contents=message.innerHTML =\n` + contents);

       /* let  box = document.querySelector("div");
        let  boxRect = box.getBoundingClientRect();
        console.log("boxRect.width=", boxRect.width); // 110 (100 width + 10 border) and ignores padding
        console.table("boxRect=", boxRect); */


        // write out fully processed converted by asciidoc.js then html, head, body etc tags added file that can be read by browser. cf raw processed file above.

        // add meta   wi refresh 5 sec to update browser on changes - but try /usr/bin/falkon - reloads on change
        //let newhtmloutputWiMeta = newhtmloutput.replace( `<meta charset="utf-8" />`, `<meta charset="utf-8" /><meta http-equiv="refresh" content="5" >\n`);
        //console.log('newhtmloutputWiMeta=\n' + newhtmloutputWiMeta);
       //fs.writeFileSync(htmloutputDir +  htmloutputFile, newhtmloutputWiMeta);
       fs.writeFileSync(htmloutputDir +  htmloutputFile, newhtmloutput);

       return message;    // this is needed or does not work - not sure why.
    }; //END var getTextOpenWrite =function



    //this.element.appendChild(getTextOpenWrite());  //return message  //// WORKS wi this here I dont know why????
    //this.element.appendChild(getTextOpenWrite());  //return message

      //let editor = atom.workspace.getActiveTextEditor();console.log('editor=\n' + editor);
      var runFnGetTextOpenWrite = false;  // declare whether to run or not as like a global wi var not let
                  if (consprint)    console.log( 'typeof(editor)=\n' + typeof(editor));
        let ext = path.extname(editor.getPath()); //if not asciidoc file then ignore
        if ( fileExtensions.includes(ext)) {    //used to be return; }
                        console.log( 'editor.getTitle()=\n' + editor.getTitle())  //SOMEHOW SET THE TITLE

          // NB NB any reference to  this.element.appendChild(getTextOpenWrite()) makes the pane appear.
         //  .scrollTop=anyNumber does not seem to do anything but there is no error.
          //this.element.appendChild(getTextOpenWrite());  // Original line workspace
          //this.element.appendChild(getTextOpenWrite()).scrollTop=1000;  // Original line workspace

          var myElement = this.element.appendChild(getTextOpenWrite()).scrollTop=1000000000;
          //myElement.scrollTop=10000;
          //document.scrollTop=10000;




          /* from https://stackoverflow.com/questions/13266746/scroll-jump-to-id-without-jquery  9
          var container = document.body,
         element = document.getElementById('ElementID');
         container.scrollTop = element.offsetTop; */

          // does not work yet but no syntax errors
         //var container = this.element.appendChild(getTextOpenWrite());
         //var myelement = container.querySelector('#mytarget');  // NB querySelector Not getElementById which is for whole doc not element
          //container.scrollTop = myelement.offsetTop;

          // EXPERIMENTAL try to hide panel first incase open initialLine does not work when panelis open.  NONE WORK - keep opening new file because the uri is not that of "Ians Preview Asciidoc" and I cannot find out what it should be.

          //if (atom.workspace.hide( "atom://ianasciidocpreview-active-editor-info")) { alert("Hidden"); }

            //atom.workspace.open("atom://ianasciidocpreview-active-editor-info",  { initialLine: 123 }); **********
          //atom.workspace.open( "atom://ianasciidocpreview-active-editor-info", { initialLine: 200 }); // try & open on line 20   NB see l59
          //atom.workspace.open( "atom://ianasciidocpreview-active-editor-info", { initialLine: 20 });
        //  alert("Opened");

        // get project dir & filename for opening in browser

          //



          // TEST addRightPanel  generates large unuseable fixed panel - Zoom does not work.
        //atom.workspace.addRightPanel({item: getTextOpenWrite()});

        // try and open pane with asciidocpreview.html file using html-preview
        // cf stackoverflow question 60784661
        /* KEEP THIS - it WORKS runs html-preview
        const target  = atom.views.getView(atom.workspace);
        const commandName = 'atom-html-preview:toggle';
        atom.commands.dispatch(target, commandName); */


          if (consprint)  console.log('l147 this.element=' + this.element);

           //child_process.execSync('firefox htmloutput.html' );  // try browser but blocks until ende
        } //if not asciidoc in ext list

      return editor.onDidDestroy(function() {
        return onSaveDisposable.dispose();
      }); //END return editor.onDidDestroy

    } //END editor => {
  ); //END this.subscriptions =
  } //END constructor(serializedState)

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      // This is used to look up the deserialiser function. It can be any string,
      // NB NB NB but needs to be unique across all packages.
      deserializer: 'ianasciidocpreview-active-editor-info/IanasciidocpreviewActiveEditorInfoView'
    };
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    // Used by pulsar for tal textContent
    if (typeof atom.workspace.getActiveTextEditor() === "undefined") { return "undefined Title"; }
    else {return "Ians Preview Asciidoc";
    }  // original   return 'Ian Active Editor Info';
  }

  getURI(){
    // Used by Pulsar to identify the view when toggling
    return 'atom://ianasciidocpreview-active-editor-info';
  }

  getDefaultLocation() {
    // will be used if not overridden by dragging elsewhere
    // valid are 'left' ;right, 'bottom', 'center' (the default)
    return 'right';
  }

  getAllowedLocations() {
    // locations into which the item can be removed
    return ['left', 'right', 'bottom'];
  } //END getAllowedLocations


} //END export default class IanasciidocpreviewActiveEditorInfoView

// this anonymous function calls atom-html-preview & assignes to command "zyxw"
//put the function in .pulsar.init.js
// run ctrl-shft-P  then enter zxyw   to see & execute command.
// see https://stackoverflow.com/questions/54898636/how-to-add-custom-command-from-package-in-atom-io
// desribed in detail in /media/AcerWinData/AcerIansDocs/Linux/IanUbuntuHelp/Pulsar/CallPackageInJS_Pulsar.txt
function iansHtmlPreview() {
      var view;
      view = atom.views.getView(atom.workspace.getActiveTextEditor());
      if (consprint)  console.log('iansHtmlPreview.view=\n' + view);
      atom.commands.dispatch(view, "core:select-all");
      return atom.commands.dispatch(view, "atom-html-preview:toggle");
    }

    (function() {
      atom.commands.add("atom-workspace", {
        "zyxw": function() {
          var view;
          view = atom.views.getView(atom.workspace.getActiveTextEditor());
          atom.commands.dispatch(view, "core:select-all");
          return atom.commands.dispatch(view, "atom-html-preview:toggle");
        }
      });

    }).call(this);

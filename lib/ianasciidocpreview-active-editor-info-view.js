// @flow
'use babel';
// cf /home/ian/github/ianasciidocpreview-active-editor-info-202304031546/lib/ianasciidocpreview-active-editor-info-lib-202304031546_completeLatest.txt   for details to find error that made preview not change wi edited file

// set consprint to true or false to control whether console.log output is generated.
// Remember that Ctrl-Shift-I to turn this on. You may need --no-sandbax on pulsar command line too.
const consprint = false;
const path = require("path");
//global to communicate wi fn getTitle initial title set to check that changes are made
var getTitleGlobal = "getTitleGlobal from let"; //used by getTitle atom fn near en
export default class IanasciidocpreviewActiveEditorInfoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('ianasciidocpreview-active-editor-info');

    console.log('l16 this='); console.log(this);
    // Create message element from original
    //const message = document.createElement('div');
    const  message = document.createElement('div'); //cont changed to let
    //message.textContent = 'The IanasciidocpreviewActiveEditorInfo package is Alive! It\'s ALIVE!';
    message.classList.add('message');  //required to allow CSS attributes to it
    //this.element.appendChild(message);  //message will be appended later

    //let articleBody = document.createElement('div');
    //articleBody.classList.add('articleBody');

  //this.subscriptions = atom.workspace.getCenter().observeActivePaneItem((item) => {  // original from preview-active-editor-info

  this.subscriptions = atom.workspace.observeActiveTextEditor(editor => {   //Choosen working alternative
  //this.subscriptions = atom.workspace.open(editor => {   //Testing open
          console.log('l34 this='); console.log(this); console.log ("editor="); console.log( editor );

    // testing onDidSave /media/AcerWinData/AcerIansDocs/middleman_sites/ManjTEST01my_new_project_MARKDOWN_TEST_RIP_ISPrivate/_PulsarIssues/atom.workspace.observeTextEditors_OnChange_Etc.txt
    var fileExtensions = [".adoc", ".asciidoc", ".ad", ".asc", ".txt"];
    if (typeof editor === "undefined" || editor === null) { return };

    let onSaveDisposable;
    onSaveDisposable = editor.onDidSave(function(){
      console.log("l40 typeof(editor)=" + typeof(editor))
      //this.element.appendChild(getTextOpenWrite());  //return message TypeError: Cannot read property 'element' of undefined
      if (typeof editor !== "undefined" && editor !== null) {  //editor must be defined or getType > error
        let ext = path.extname(editor.getPath()); //if not asciidoc file then ignore
        if ( fileExtensions.includes(ext)) {
          getTextOpenWrite();  // must have adoc type extension
        }
        //IanasciidocpreviewActiveEditorInfoView.element.appendChild(getTextOpenWrite());  //return message TypeError: Cannot read property 'element' of undefined
        return editor.setCursorBufferPosition([0, 0]);  // this does move cursor as expected
      };
    });

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
      let asciidoctorCssPath = path.resolve( "asciidoctor.css"); //create absolute path
      const asciidoctorCssWeb = "https://raw.githubusercontent.com/asciidoctor/asciidoctor/v2.0.x/src/stylesheets/asciidoctor.css";
      console.log("asciidoctorCssPath=" + asciidoctorCssPath);
      // error correction - checking for css local or getting web file does not work
      //let stats = fs.statsSync.isFile(asciidoctorCssPath);
      //if (!fs.statSync.isFile(asciidoctorCssPath)) {asciidoctorCssPath = asciidoctorCssWeb}; // if local .css not exist get web version
      return asciidoctorCssPath;
    } //END getUrlForAsdiidoctorCss() */

    function getTextOpenWrite() {   // function getTextOpenWrite()  YYYelement = this.element
      // originally  getTextOpenWrite(YYYelement)   YYYelement not used as call is outside function
      let words = editor.getText();
                  if (consprint)   console.log('editor.getText=\n' + typeof(editor.getText()));

      let htmloutputFile = 'iansasciidocpreviewhtmloutput.html'; let htmloutputDir = "./"; // append /
      let htmloutPath = path.resolve( htmloutputFile); console.log("htmloutPath=\n" + htmloutPath);


      atom.workspace.updateWindowTitle("NEw Window Title");  //does not set title on any pane

      // check file.ext is asciidoc type or txt  ALL CHECKED ABOVE IF statement
      const Asciidoctor = require('asciidoctor')();
      const asciidoctor = Asciidoctor();  //cf https://docs.asciidoctor.org/asciidoctor.js/latest/setup/install/
      // convert words asciidoc string  to html with Asciidoctor.js
      // cf https://docs.asciidoctor.org/asciidoctor.js/latest/processor/convert-options/
      // read about document attributes on asciidoctor.org/docs/user-manual/#attribute-catalog
      // htmloutput (standalone) is a complete web page wi <!DOCTYPE html>, html, head, <body class="article"> correct to end

      let htmloutput = Asciidoctor.convert(words, {'attributes': { 'linkcss': true }}); //, { standalone: true }); // Works with Asciidoctor NOT asciidoctor
      //let htmloutput = Asciidoctor.convert(words, {'attributes': {  'safe': 'safe'}}); // safe: safe to use inline style syntax incorrect
                           if (consprint) console.log('l58 original htmloutput=\n' + htmloutput );

      // NB height must be given in px or no vert scrolling. Arrow keys work but not PgUp & PgDown
      // width should not be present & can dragged wider. If specified, say 30% will be % of the active editor panel not total pulsar size
      let asciidocUrl =  atom.workspace.getActiveTextEditor().getTitle();  console.log('asciidocUrl =\n' + asciidocUrl);
      // NB NB asciidocUrl is what I want to be the title of the preview pane. How to do that?

      let asciidocUrlHref = '<a href="' + htmloutPath + '" >' +    asciidocUrl + '</a>'; console.log('asciidocUrlHref =\n' + asciidocUrlHref);
      console.log("getTitleGlobal= " + getTitleGlobal);
      getTitleGlobal = asciidocUrl; //set a global to pass to getTitle
      console.log("after assignment getTitleGlobal= " + getTitleGlobal);
       // scroll styleing on body givesno scrollbars but it does on div within body.
       // NB <hr> color v difficult to style so don't use

      //let getAsciidoctorCssPath  = path.resolve( "asciidoctor.css"); //create absolute path Should be function

       let newhtmloutput =  // from en of markdow-preview-view.js
       `\
       <!DOCTYPE html>
       <html>
        <head>
          <meta charset="utf-8" />
          <title> ${asciidocUrl} Preview </title>
          <style> MyStyle </style>
          <link rel="stylesheet" href="${getAsciidoctorCssPath()}">
        </head>
        <body class="article" >
          <div id="insideBody" style="overflow-y: scroll; overflow-x: scroll; height: 1001px; ">
            <div>
              <h2>Asciidoctor.js rendering of ${asciidocUrl}  </h2><br>
              <p>Stylesheet is ${getAsciidoctorCssPath()}
              to see in browser open:  ${htmloutPath} <br>
              <a href="${htmloutPath}" > ${htmloutPath} </a> <br>
              ${asciidocUrlHref}    <br>
               Drag edge to extend to L. Height cannot be altered. <hr>
            </div>
            <div class="article">  ${htmloutput} </div>
          </div>
        </body>
      </html>` + `\n`;  // ensure trailing newline
                      if (consprint)  console.log('l75 newhtmloutput=\n' + newhtmloutput );
       // Create message element from original   FROM ABOVE
       //const message = document.createElement('div');  //needs to be created above so that preview changes as different .adoc files opened in editor.
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

       //message.setHTML = newhtmloutput;
       contents = message.innerHTML;
                    if (consprint) console.log(`l127 contents=message.innerHTML =\n` + contents);

       const fs =  require("fs"); // write out file that can be read by browser
       fs.writeFileSync(htmloutputDir + htmloutputFile, newhtmloutput);
       return message;    // this is needed or does not work - not sure why.
    }; //END var getTextOpenWrite =function

    //this.element.appendChild(getTextOpenWrite());  //return message  //// WORKS wi this here I dont know why????
    //this.element.appendChild(getTextOpenWrite());  //return message

      //let editor = atom.workspace.getActiveTextEditor();console.log('editor=\n' + editor);
      var runFnGetTextOpenWrite = false;  // declare whether to run or not as like a global wi var not let
                    console.log( 'typeof(editor)=\n' + typeof(editor));
      //const ext = path.extname(editor.getPath()); //if not asciidoc file then ignore
      //let fileExtensions = [".adoc", ".asciidoc", ".ad", ".asc", ".txt"];
      //if (typeof editor !== "undefined" && fileExtensions.includes(ext)) { runFnGetTextOpenWrite = true} else {runFnGetTextOpenWrite = false};
      //console.log("l63 runFnGetTextOpenWrite=" + runFnGetTextOpenWrite);

        let ext = path.extname(editor.getPath()); //if not asciidoc file then ignore
        if ( fileExtensions.includes(ext)) {    //used to be return; }
                        console.log( 'editor.getTitle()=\n' + editor.getTitle());  //SOMEHOW SET THE TITLE
          //getTextOpenWrite( this.element );  //getTextOpenWrite(YYYelement=this.element)
          this.element.appendChild(getTextOpenWrite());

          console.log('l147 this.element=' + this.element);
          //alert(JSON.stringify(this, null, 4)); // show what "this" is

            //atom.workspace.open(editor); //Testing to see if this works for editor  NO EFFECT  WRONG way of using

           //child_process.execSync('firefox htmloutput.html' );  // try browser but blocks until ende
        } //if not asciidoc in ext list

      return editor.onDidDestroy(function() {
        return onSaveDisposable.dispose();
      }); //END return editor.onDidDestroy

    }); //END this.subscriptions =
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
    console.log("fn getTitle getTitleGlobal=" + getTitleGlobal);
    if (typeof atom.workspace.getActiveTextEditor() === "undefined") { return "undefined Title"; }
    //else { return atom.workspace.getActiveTextEditor().getTitle();
    else {return getTitleGlobal;
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
  }

  // from home/ian/PulsarBuildsEtc/pulsar/node_modules/markdown-preview/lib/markdown-preview-view.js
  // generates Uncaught (in promise) ReferenceError: Disposable is not defined
  /*onDidChangeModified (callback) {
    // No op to suppress deprecation warning
    return new Disposable();
  }*/

  /*onDidChangeTitle (callback) {
    return this.emitter.on('did-change-title', callback);
  }*/
}

// this anonymous function calls atom-html-preview & assigndes to command "zyxw"
// see https://stackoverflow.com/questions/54898636/how-to-add-custom-command-from-package-in-atom-io
// desribed in detail in /media/AcerWinData/AcerIansDocs/Linux/IanUbuntuHelp/Pulsar/CallPackageInJS_Pulsar.txt
function iansHtmlPreview() {
      var view;
      view = atom.views.getView(atom.workspace.getActiveTextEditor());
      console.log('iansHtmlPreview.view=\n' + view);
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

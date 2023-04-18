'use babel';
// cf /home/ian/github/ianasciidocpreview-active-editor-info-202304031546/lib/ianasciidocpreview-active-editor-info-lib-202304031546_completeLatest.txt   for details to find error that made preview not change wi edited file

// set consprint to true or false to control whether console.log output is generated.
// Remember that Ctrl-Shift-I to turn this on. You may need --no-sandbax on pulsar command line too.
const consprint = false;
export default class IanasciidocpreviewActiveEditorInfoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('ianasciidocpreview-active-editor-info');

    // Create message element from original
    const message = document.createElement('div');
    //message.textContent = 'The IanasciidocpreviewActiveEditorInfo package is Alive! It\'s ALIVE!';
    message.classList.add('message');  //required to allow CSS attributes to it
    //this.element.appendChild(message);  //message will be appended later

    //this.subscriptions = atom.workspace.getCenter().observeActivePaneItem((item) => {
    //this.subscriptions = atom.workspace.getCenter().onDidSave((item) => {  // does not work

    //this.subscriptions = atom.workspace.observeTextEditors((editor) => {
        //editor.insertText('Hello World')  // observeTextEditors does not change preview with editor

    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem((item) => {
        let editor = atom.workspace.getActiveTextEditor();
        let words = editor.getText();

        const path = require("path");
        let htmloutputFile = 'iansasciidocpreviewhtmloutput.html'; let htmloutputDir = "./"; // append /
        let htmloutPath = path.resolve( htmloutputFile); console.log("htmloutPath=\n" + htmloutPath);

        // check file.ext is asciidoc type or txt

        const ext = path.extname(editor.getPath()); //if not asciidoc file then ignore
                        if (consprint) console.log(' EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE extension=\n' + ext );
        let fileExtensions = [".adoc", ".asciidoc", ".ad", ".asc", ".txt"];
        if ( !fileExtensions.includes(ext)) { return; } // if not asciidoc extension return = leave this.subscription, I think?

        //              if (consprint) console.log(`this.subscriptions words=\n` + words);  // log original asciidoc string
        //              console.table(atom.workspace.getPaneItems());
        //              console.table(atom.workspace.getTextEditors());
        const Asciidoctor = require('asciidoctor')();
        const asciidoctor = Asciidoctor();  //cf https://docs.asciidoctor.org/asciidoctor.js/latest/setup/install/

        // convert words asciidoc string  to html with Asciidoctor.js
        // htmloutput (standalone) is a complete web page wi <!DOCTYPE html>, html, head, <body class="article"> correct to end
        let htmloutput = Asciidoctor.convert(words, { standalone: true }); // Works with Asciidoctor NOT asciidoctor
                             if (consprint) console.log('l58 original htmloutput=\n' + htmloutput );

      // NB height must be given in px or no vert scrolling. Arrow keys work but no PgUp & PgDown
      // width should not be present & can dragged wider. If specified, say 30% will be % of the active editor panel not total pulsar size
     let newhtmloutput =  `<div id="" style="overflow-y:scroll; overflow-x:scroll; height:1000px; ">
     <h2>Asciidictor.js rendering of ` +
     atom.workspace.getActiveTextEditor().getTitle() + `</h2>\n` +
     `to see in browser open: ` + htmloutPath +
     `<hr>` + htmloutput + `</div> Drag edge to extend to L. Height cannot be altered.`;
                         if (consprint) console.log('l75 newhtmloutput=\n' + newhtmloutput );

     // Create message element from original   FROM ABOVE
     //const message = document.createElement('div');  //needs to be created above so that preview changes as different .adoc files opened in editor.
      if (consprint) console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQ message div =\n' + message);
     message.innerHTML = htmloutput;
     let contents = message.innerHTML;  // without .innerHTML only displays [object HTMLDivElement ]
                  if (consprint) console.log(`l81 contents=\n` + contents);

     //  message.insertAdjacentHTML("beforeend", inserthtml);  // works but inserts at end of entire document so use my version wi string wi <div id="" style=   as used above.


/*    This section uses querySelector to find DOM element based on various criteria and it WORKS but produces scrollbars on the whole of pulsar not on the preview panel.
       getElementBy... have been superceeded by querySelector
     //let title = message.querySelector("title"); title.after(inserthtml); // inserts inserthtml after the tiele tag.
     //let meta = message.querySelector("meta");   meta.after(inserthtml); //inserts after meta
     let title = message.querySelector("title");   title.after("<style> #content  {overflow-y:scroll; overflow-x:scroll; height:1000px;width:500px;} </style>");  // this inserts but does not produce scrollbars on panel = just whole of pulsar
        & they do not work

     contents = message.innerHTML;  // without .innerHTML only displays [object HTMLDivElement ]

     //message.head.insertAdjacentHTML("beforeend", "<style> body{overflow-y:scroll; overflow-x:scroll; height:1000px;} </style>");

                  contents = message.innerHTML; if (consprint) console.log(`contents after title.after(inserthtml) =\n` + contents);

     //const message = document.createElement('doc');     if (consprint) console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQ message div =\n' + message);
     this.element.appendChild(message);   return;

     /*  this does not work : Cannot read property 'innerAdjacetnHTML' of undefined
     message.innerHTML = htmloutput;
     if (consprint) console.log("message.innerHTML= #######################################" + message.innerHTML);
     let bodystylehtmloutput = message.head.insertAdjacentHTML("beforeend", "<style> body{overflow-y:scroll; overflow-x:scroll; height:1000px;} </style>");
     if (consprint) console.log(`bodystylehtmloutput=   ###########################################` + bodystylehtmloutput);
     */


     message.innerHTML = newhtmloutput;
                   if (consprint) console.log(`l 120 RRRRRRRRRRRRRRRRRRR  newhtmloutput message=\n` + message);
     this.element.appendChild(message);  //this  WORKS & scrollbars work too.

     // const execSync = require('child_process').execSync; // need to use async or promise, I think.
     //execSync('firefox ' + newhtmloutput );  // use  insertBefore <head> <div> overflow etc & after </body> </div>

     //message.setHTML = newhtmloutput;
     contents = message.innerHTML;
                  if (consprint) console.log(`l127 contents=message.innerHTML =\n` + contents);

     const fs =  require("fs"); // write out file that can be read by browser
     fs.writeFileSync(htmloutputDir + htmloutputFile, htmloutput);
     //const child_process = require('child_process');
     //child_process.execSync('firefox htmloutput.html' );  // try browser but blocks until ende

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
    return atom.workspace.getActiveTextEditor().getTitle();  // original   return 'Ian Active Editor Info';
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

}

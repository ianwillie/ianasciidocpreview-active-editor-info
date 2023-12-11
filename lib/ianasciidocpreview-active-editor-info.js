// @flow
'use babel';

import IanasciidocpreviewActiveEditorInfoView from './ianasciidocpreview-active-editor-info-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  IanasciidocpreviewActiveEditorInfoView: null,
  //modalPanel: null,
  subscriptions: null,

  activate(state) {
    /*this.IanasciidocpreviewActiveEditorInfoView = new IanasciidocpreviewActiveEditorInfoView(state.IanasciidocpreviewActiveEditorInfoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.IanasciidocpreviewActiveEditorInfoView.getElement(),
      visible: false
    }); */

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
        // Add an opener for our IanasciidocpreviewActiveEditorInfoView
        atom.workspace.addOpener((uri) => {
            console.log(' ...info.js l23 uri=' + uri);
          if (uri === "atom://ianasciidocpreview-active-editor-info") {
            return new IanasciidocpreviewActiveEditorInfoView();
          }
        }),
               /*     Just experimenting
        atom.workspace.addOpener((uri) => {
            console.log(' ...info.js l31 uri=' + uri);
          if (uri === "atom://temp/iansasciidocpreviewtransformscale.txt") {
            return new iansasciidocpreviewtransformscaleView();
          }
        }), */


        // Register command that transformScaleUp this view
        atom.commands.add('atom-workspace', {
          'ianasciidocpreview-active-editor-info:transformScaleUp': () => this.transformScaleUp(),
        }),

        // Register command that transformScaleDown this view
        atom.commands.add('atom-workspace', {
          'ianasciidocpreview-active-editor-info:transformScaleDown': () => this.transformScaleDown(),
        }),

        // Register command that zoomInOutWiTextFile this view
        /* atom.commands.add('atom-workspace', {
          'ianasciidocpreview-active-editor-info:zoomInOutWiTextFile': () => this.zoomInOutWiTextFile(),
        }), */

        // Register command that transformScaleDown this view
        atom.commands.add('atom-workspace', {
          'ianasciidocpreview-active-editor-info:openBrowserPopup': () => this.openBrowserPopup(),
        }),

        // Register command that toggles this view
        atom.commands.add('atom-workspace', {
          'ianasciidocpreview-active-editor-info:toggle': () => this.toggle(),
        }),

        //Destroy any IanasciidocpreviewActiveEditorInfoViews when the package is deactivated
        new Disposable(() => {
          atom.workspace.getPaneItems().forEach((item) => {
            if (item instanceof IanasciidocpreviewActiveEditorInfoView) {
              item.destroy();
            }
          });
        })
    );
  }, //END activate

  deactivate() {
    this.subscriptions.dispose();
  },


  /* serialize() {  // removed serialize each instance individually
    return {
      IanasciidocpreviewActiveEditorInfoViewState: this.IanasciidocpreviewActiveEditorInfoView.serialize()
    };
  }, */

/* keymaps/ianasciidocpreview-active-editor-info.json   These keystrokes are used for preview and zoom in/out
{
  "atom-workspace": {
    "ctrl-alt-Y": "ianasciidocpreview-active-editor-info:toggle",
    "ctrl-alt-+": "ianasciidocpreview-active-editor-info:transformScaleUp",
    "ctrl-alt-_": "ianasciidocpreview-active-editor-info:transformScaleDown"
  }
}  */

/*
transformScaleUp() {
  this.zoomInOutWiTextFile(0.20);
},
transformScaleDown() {
  this.zoomInOutWiTextFile(-0.20);
},

zoomInOutWiTextFile(zoomStep= +0.20) {
  const path = require("path"); const fs =  require("fs");
  const zoomScaleDefault=1.20;
  var zoomScale1; var zoomScaleReReadCheck;
  console.log("zoomInOutWiTextFile called");

  try {
    zoomStart = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
    zoomStart = (Number(zoomStart)).toFixed(2);
    console.log("zoomStart 1 =" + zoomStart + "  typeof " + typeof(zoomStart) );
    zoomScale =  Number(zoomStart) +  zoomStep;
    if (isNaN(zoomScale)) {zoomScale = zoomScaleDefault };
    fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String((Number(zoomScale)).toFixed(2)));
  } catch (err) {
    if (err.code === 'ENOENT') {  //file does not exist
      console.log( 'File not found');  // create wi default
      fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String(zoomScaleDefault.toFixed(2)));
    };
  } //END catch

  //check if  .txt file is really written to.
  zoomScaleReReadCheck = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
  zoomScaleReReadCheck = Number(zoomScaleReReadCheck);
  console.log("zoomScaleReReadCheck =" + zoomScaleReReadCheck  + "  typeof " + typeof(zoomScaleReReadCheck) );
  if (zoomScaleReReadCheck != zoomScale) {
    console.log("ERROR!  zoomScaleReReadCheck and zoomScale do not agree");
  } else  {
    console.log("HAPPY!  zoomScaleReReadCheck and zoomScale  agree");
  };

  // https://stackoverflow.com/questions/56203800/atom-package-create-a-file
  //Essential to do this or new transformScale is not updated in Pulsar.
  // before doing this is was necessary to open temp/iansasciidocpreviewtransformscale.txt
  //in editor (& maybe save it, cant remember if this last step was needed.)
  atom.workspace.open('temp/iansasciidocpreviewtransformscale.txt',  {activatePane:false})   //   activatePane:false does not open bu saves value
  .then( newTab => {
    newTab.insertText(' ');
    newTab.save();
    // newTab.close();   //does nothing obvious - I have found that im Command Palette core.close  (keyboard Ctrl+w) will close tab. How to implement core.close in js?

    //newTab.destroy();  // without this the tab is left open as text editor open option activatePane:false essential or many unnamed files appear.
    //  newTab.destroy(); // essentail or pulsar opens ...transformscale.txt instead of preview
  });


  // apparentlly closing file is not needed it read & wrties the entire file & then it is closed automatically.
  // if a file descriptor is used with openSync, then closeSync should be used afterwards.


}, //END zoomInOutWiTextFile() NB at end }, comma & no function at start cos inside subscriptions  */

//from branch TESTmain ready to go to branch TESTtransflormScaleUpEtc

/*  ORIGINAL transformsScaleUp  before tryCatch added
  transformScaleUp() {
    let XXXtransformScale;
    const path = require("path"); const fs =  require("fs");
    console.log("transformScaleUp called");

    XXXtransformScale = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
    XXXtransformScale = (Number(XXXtransformScale)).toFixed(2);
    console.log("XXXtransformScale 1 =" + XXXtransformScale + "  typeof " + typeof(XXXtransformScale) );
    XXXtransformScale = 0.20 + Number(XXXtransformScale) ;
    fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String((Number(XXXtransformScale)).toFixed(2)));
    XXXtransformScale = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
    XXXtransformScale = Number(XXXtransformScale);
    console.log("XXXtransformScale 2 =" + XXXtransformScale  + "  typeof " + typeof(XXXtransformScale) );

    // https://stackoverflow.com/questions/56203800/atom-package-create-a-file
    //Essential to do this or new transformScale cannot be read from file  I cant remember why.
    atom.workspace.open('temp/iansasciidocpreviewtransformscale.txt')
      .then( newTab => {
        newTab.insertText(' ');
        newTab.save();
        newTab.destroy();
        //newTab.hide();  newTab.close();   hide & close are not funcions.
    });


    //let windowHeight = atom.getSize().height;  atom.confirm({message: "transformScaleUp called atom.confirm", detailedMessage: "This is detailedMessage" })
    // console.log("transformScaleUp windowHeight=" + windowHeight)

  }, //END transformScaleUp  */

  transformScaleUp() {
    let XXXtransformScale;
    const path = require("path"); const fs =  require("fs");
    console.log("XVCT TtransformScaleUp called");

    try{
      XXXtransformScale = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
      XXXtransformScale = (Number(XXXtransformScale)).toFixed(2);
      console.log("XVCT XXXtransformScale 1 =" + XXXtransformScale + "  typeof " + typeof(XXXtransformScale) );
      XXXtransformScale = 0.20 + Number(XXXtransformScale) ;
      fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String((Number(XXXtransformScale)).toFixed(2)));

      console.log("XVCT XXXtransformScale 2 =" + XXXtransformScale  + "  typeof " + typeof(XXXtransformScale) );

    } catch(err) {
      console.log("XVCT err =" + err );
      if (err) {
        fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String(1.00));
        console.log("XVCT  1.00 written to file");
      }
    }
    // if (transformScale < 0.5 or gt 3 say do nothing???

    // https://stackoverflow.com/questions/56203800/atom-package-create-a-file
    //Essential to do this or new transformScale cannot be read from file  I cant remember why.
    atom.workspace.open('temp/iansasciidocpreviewtransformscale.txt')
      .then( newTab => {
        newTab.insertText(' ');
        newTab.save();
        newTab.destroy();
        //newTab.hide();  newTab.close();   hide & close are not funcions.
    });

    //let windowHeight = atom.getSize().height;  atom.confirm({message: "transformScaleUp called atom.confirm", detailedMessage: "This is detailedMessage" })
    //  console.log("transformScaleUp windowHeight=" + windowHeight)

  }, //END transformScaleUp


    transformScaleDown() {
      let XXXtransformScale;
      const path = require("path"); const fs =  require("fs");
      console.log("transformScaleDown called");

      XXXtransformScale = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
      XXXtransformScale = (Number(XXXtransformScale)).toFixed(2);
      console.log("XXXtransformScale 1 =" + XXXtransformScale + "  typeof " + typeof(XXXtransformScale) );
      XXXtransformScale = -0.20 + Number(XXXtransformScale) ;
      fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String((Number(XXXtransformScale)).toFixed(2)));
      XXXtransformScale = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
      XXXtransformScale = Number(XXXtransformScale);
      console.log("XXXtransformScale 2 =" + XXXtransformScale  + "  typeof " + typeof(XXXtransformScale) );

      // https://stackoverflow.com/questions/56203800/atom-package-create-a-file
      //Essential to do this or new transformScale cannot be read from file  I cant remember why.
      atom.workspace.open('temp/iansasciidocpreviewtransformscale.txt')
        .then( newTab => {
          newTab.insertText(' ');
          newTab.save();
          newTab.destroy();
          //newTab.hide();  newTab.close();   hide & close are not funcions.
      })

/*
    try {
      XXXtransformScale = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
      console.log("XXXtransformScale 1 try =" + XXXtransformScale + "  typeof " + typeof(XXXtransformScale) );
      XXXtransformScale = 0.11 + Number(XXXtransformScale).toFixed(2) ;
      fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String(XXXtransformScale.toFixed(2)));
      console.log("XXXtransformScale 2 catch else =" + XXXtransformScale  + "  typeof " + typeof(XXXtransformScale) );

      // if (transformScale < 0.5 or gt 3 say do nothing???
      //return transformScale;
    } catch (err) {
      if (err.code === 'ENOENT') {  //file does not exist
        console.log( 'File not found  Do nothing  err=' + err );  // create wi default
        fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String(1.00));
        console.log("1.00 written to file");

      }
    }  */

  }, //END transformScaleDown

  openBrowserPopup() {   // called wi Ctrl-Alt-F  NB C-A-B is used by JavaScript
                                            //  Packages>Settings View>Show Keybindings
        const cp = require("child_process");
        const windowFeatures = "left=100, top=100, width=320, height=320";
        const target = "iansasciidocpreviewhtmloutputhtml";
        var exitCode;
        //open("http://www.formasterminds.com");
        console.log("openBrowserPopup   called");
        /*open("file:/media/AcerWinData/github_from_home/CloneOfianasciidocpreview-active-editor-info-20230915_ChromeZoomWiTransformFactorInFile/temp/iansasciidocpreviewhtmloutput.html"   );
                      // ,target, windowFeatures);   // do not use popup ie windowFeatures cos not controllable.
        let listing = cp.execFileSync("ls",   {encoding: "utf8"});
        alert("listing=" + listing);  */

        // this hangs till browser is closed - async needed, I think.
        //exitCode = cp.execFileSync("/usr/bin/firefox", ["/media/AcerWinData/github_from_home/CloneOfianasciidocpreview-active-editor-info-20230915_ChromeZoomWiTransformFactorInFile/temp/iansasciidocpreviewhtmloutput.html"],    {encoding: "utf8"});

        //exitCode = cp.execFileSync("/usr/bin/firefox",   {encoding: "utf8"});
        //console.log("execFileSync exitCode=" + exitCode);

        // https://www.golinuxcloud.com/node-js-child-process/
        //Example 1 List contents of public directory node.js exec method
        //const cp = require("child_process")

        const options = {
          encoding: 'utf-8',
          maxBuffer: 100 * 1024,
          cwd: null,
          timeout: 0,
          env: null,
          killSignal: 'SIGTERM'
        }
       //cp.exec("ls -l", options, (e, stdout, stderr) => {
        cp.exec("/usr/bin/firefox /media/AcerWinData/github_from_home/CloneOfianasciidocpreview-active-editor-info-20230915_ChromeZoomWiTransformFactorInFile/temp/iansasciidocpreviewhtmloutput.html", options, (e, stdout, stderr) => {
          if (e) throw e

            console.log(stdout)
        })

        process.on("uncaughtException", e => e ? console.log(e.message) : console.log(""))


      /*  //Flanagan,2020,DefinitiveGuideJS, 16.10.2
        const child_process = require("child_process");
        const util = require("util");
        const execP = util.promisify(child_process.exec);

        function parallelExec(commands) {
            // Use the array of commands to create an array of   Promises
            let promises = commands.map(command => execP(command,   {encoding: "utf8"}));
            // Return a Promise that will fulfill to an array of the  fulfillment
            // values of each of the individual promises. (Instead of   returning objects
            // with stdout and stderr properties we just return the  stdout value.)
            return Promise.all(promises)
                .then(outputs => outputs.map(out => out.stdout));
        };
        //module.exports = parallelExec;
        parallelExec( ["/usr/bin/firefox /media/AcerWinData/github_from_home/CloneOfianasciidocpreview-active-editor-info-20230915_ChromeZoomWiTransformFactorInFile/temp/iansasciidocpreviewhtmloutput.html"])
            .then(console.log("stdout: " + stdout))
            .catch(console.log);
        */



      },


  toggle() {

    console.log('IanasciidocpreviewActiveEditorInfo was toggled!');
    atom.workspace.toggle('atom://ianasciidocpreview-active-editor-info');

    atom.workspace.getPaneItems().forEach((item) => {
      if (item instanceof IanasciidocpreviewActiveEditorInfoView) {
        atom.workspace.hide(item);
      }
    });
  } ,

  deserializeIanasciidocpreviewActiveEditorInfoView(serialized) {
    return new IanasciidocpreviewActiveEditorInfoView();
  }
};

/*  Try moving zoomInOutWiTextFile to subscription as it references atom...open
function zoomInOutWiTextFile(zoomStep= +0.20) {
    const path = require("path"); const fs =  require("fs");
    const zoomScaleDefault=1.20;
    var zoomScale1; var zoomScaleReReadCheck;
    console.log("zoomInOutWiTextFile called");

    try {
      zoomStart = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
      zoomStart = (Number(zoomStart)).toFixed(2);
      console.log("zoomStart 1 =" + zoomStart + "  typeof " + typeof(zoomStart) );
      zoomScale =  Number(zoomStart) +  zoomStep;
      if (isNaN(zoomScale)) {zoomScale = zoomScaleDefault };
      fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String((Number(zoomScale)).toFixed(2)));
    } catch (err) {
        if (err.code === 'ENOENT') {  //file does not exist
          console.log( 'File not found');  // create wi default
          fs.writeFileSync('temp/iansasciidocpreviewtransformscale.txt', String(zoomScaleDefault.toFixed(2)));
        };
    }
    zoomScaleReReadCheck = fs.readFileSync('temp/iansasciidocpreviewtransformscale.txt');
    zoomScaleReReadCheck = Number(zoomScaleReReadCheck);
    console.log("zoomScaleReReadCheck =" + zoomScaleReReadCheck  + "  typeof " + typeof(zoomScaleReReadCheck) );
    if (zoomScaleReReadCheck != zoomScale) {
      console.log("ERROR!  zoomScaleReReadCheck and zoomScale do not agree");
    } else  {
      console.log("HAPPY!  zoomScaleReReadCheck and zoomScale  agree");
    };

    // https://stackoverflow.com/questions/56203800/atom-package-create-a-file
    //Essential to do this or new transformScale is not updated in Pulsar.
    // before doing this is was necessary to open temp/iansasciidocpreviewtransformscale.txt
    //in editor (& maybe save it, cant remember if this last step was needed.)
    atom.workspace.open('temp/iansasciidocpreviewtransformscale.txt')
      .then( newTab => {
        newTab.insertText(' ');
        newTab.save();
        newTab.destroy();
        //newTab.hide();  newTab.close();   hide & close are not funcions.
    })

    // apparentlly closing file is not needed it read & wrties the entire file & then it is closed automatically.
    // if a file descriptor is used with openSync, then closeSync should be used afterwards.

}; //END zoomInOutWiTextFile()
*/

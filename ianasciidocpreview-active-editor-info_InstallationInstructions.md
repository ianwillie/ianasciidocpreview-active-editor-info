My version of an asciidoc-preview "ianasciidocpreview-active-editor-info"
========================================================================
This file can be found in ianasciidocpreview-active-editor-info/

This is my first attempt at developing a pulsar package. This is designed to replace asciidoc-preview which fails to preview asciidoc files in pulsar or atom after v1.60.
This package ianasciidocpreview-active-editor-info has been developed from the package active-editor-info from  Hacking Pulsar.
It does work to render asciidoc files in a separate pane which can be scrolled or dragged to view the content and resized in width. There are a few quirks and unexpected behaviours which are described below.
This is a development package and I am asking advice on how to resolve various problems from people who know more about pulsar, atom and node than I.  Be aware that I take no responsibility for any untoward effects that installing package may have on your computer system: so be warned!
In particular it might be better to replace innerHTML() with setHTML() which is supposed to sanitise any html before it is generated.

I would suggest that anyone interested follow the guide below on how to install and use the package. I have not contemplated putting it on github because it is at such an early stage of development and I am a beginner in this field and looking for advice.

Thanks for the help I have received up to nor, particularly from @confused-Techie & @Maurício Szabo.

I hope this is of help to someone.


## Help needed

I could do with help on these issues which are evident at the moment.


/lib/ianasciidocpreview-active-editor-info-view file uses observeActivePaneItem() where I would have thought it more appropriate to use something related to  the TextEditorPane.  I have not been able to work out how to do this looking through the extensive lists of possibilities in the flight-manual.

        "this.subscriptions = atom.workspace.getCenter().observeActivePaneItem((item) => {
        let editor = atom.workspace.getActiveTextEditor();
        let words = editor.getText(); "

Probably related to that, I do not know how to get the preview to change when I save the .adoc file. The preview only changes when the focus pane is changed to another and back to the original. It shows the edited changes even though the file has not been saved.

I keep getting this error: Uncaught TypeError: Cannot read property 'getText' of undefined, lib/ianasciidocpreview-active-editor-info-view.js:28. I can see that the editor may be undefined but how do I skip this command in that case?
This seems to appear when using markdown-preview package as well.

I hope to get some degree of scrolling so that they adoc and preview are in sync.

Installation
============
You may need to install asciidoctor.js  with npm. See below for details and https://docs.asciidoctor.org/asciidoctor.js/latest/setup/install/

Download ianasciidocpreview-active-editor-info.zip to a directory like ~/Downloads & unzip.

Either, 1. copy the files to the directory ~/.pulsar/packages//home/ian/github/ianasciidocpreview-active-editor-info or
2. create a symbolic link between ~/.pulsar/packages//home/ian/github/ianasciidocpreview-active-editor-info and the unzipped directory.

Restart pulsar.  (This program was developed using cd ~/.pulsar/packages/ianasciidocpreview-active-editor-info; <MyDownloadDirectory>/Pulsar-1.103.2023040323.AppImage . --no-sandbox )  Your command to start pulsar will be different.

Navigate to ~/.pulsar/packages/ianasciidocpreview-active-editor-info and click on the asciidoc file  DatesTEST.adoc.  This should open in an editor pane and now place the cursor within it. There will be several .adoc files in this directory.
Run the asciidoc previewing program by pressing together Ctrl-Alt-Shift-Y, or, Ctrl-Shift-P and entering ianasciidocpreview-active-editor-info: toggle, or, Menu  Packages>ianasciidocpreview-active-editor-info: toggle.

You should see a panel open on the right showing the rendered asciidoc file.  It may be necessary to enter the last command more than once because Ctrl-Alt-Shift-Y is a toggle to display or undisplay the preview panel.

Now if you click on to open  asciidoc_syntax.adoc you will see scroll bars. Mouse dragging works but up/down arrow work and PgUp & PgDown do not work yet.

There will be several .adoc files in the ~/.pulsar/packages/ianasciidocpreview-active-editor-infos directory of different sizes. Choose the smallest asciidoc_syntax_VShort.adoc to start with. It will show no vertical scroll bars because it is so small. The largest file asciidoc_syntax.adoc has many lines and should show vertical scrollbars. If you navigate right to the end there is a media file which should run with sound, full screen and so on when you click the arrow. (asciidoc_syntax.adoc is an old version of the asciidoctor syntax demo file for latest syntax look at the asciidoctor website.)

The adoc preview panel can be opened and closed with the top-right X. The left edge can be clicked and pulled to enlarge. The vertical size is set in pixels in the program otherwise the scroll is not activated.

To see what is happening use the console.log. Output to this is dictated by "const consprint = false;". Open ~/.pulsar/packages/lib/ianasciidocpreview-active-editor-info-view.js and change to "const consprint = true;", without the quotes.Press Ctrl-Shift-I to turn on the console. You may need --no-sandbox on the pulsar command line for this to work. Then use Ctr-Alt-Shift-Y.

Each time the adoc file is previewed in addition an HTML file  is created. The full path to this is indicated at the top of the preview panel. For some reason it is not possible to selected and save the text, nor click on it to open it at the moment.

Quirks
======
If you edit an .adoc file you will see no changes to the preview file until you open or click on another .adoc file panel and return to the original edited one. However, if you save the .adoc file you will not see any of the changes rendered until you do as suggested in the last sentence.

You will see error messages in the console about media files not found - but click on Show on Youtube and it works.

There are messages about missing css style files but the default asciidoc css file will be operating, I think.

Most of the URLs will not work because they are local files and the base directory is not set.

Uncaught (in promise) TypeError: Cannot read property 'getText' of undefined. I think related to handling previews of non-asciidoc type files. For a similar reason the title on preview panel may not be correct.

How I think the package works
=================================
It was created using the package generator and most of this has not been changed.
- The keymap has been changed to "ctrl-alt-shift-Y": "ianasciidocpreview-active-editor-info:toggle".

ianasciidocpreview-active-editor-info-view has been altered:
- document.createElement('div') & add ianasciidocpreview-active-editor-info to classList.
- Get text from the open adoc pane (getActiveTextEditor & get Text).
- Create a string of htmloutputPath that can be opened in a browser.
- If editor file extension is not asciidoc or text ignore (return).
- Require asciidoctor.js and with that process the adoc string to create htmloutput.
- Create newhtmloutput, which surrounds htmloutput with a <div> to enable scrolling, adds a title to preview and finally adds a note about resizing the panel.
- getTitle()   returns getActiveTextEditor().getTitle()

Tests
=====
These seem to work but relate to the original active-editor-info and should be ignored.


Asciidoctor.js installation information from my system:  (20230416)
=================================================================
      $ npm info  asciidoctor

      asciidoctor@2.2.6 | MIT | deps: 2 | versions: 26
      A JavaScript AsciiDoc processor, cross-compiled from the Ruby-based AsciiDoc implementation, Asciidoctor, using Opal
      https://github.com/asciidoctor/asciidoctor.js

      keywords: asciidoc, asciidoctor, opal, javascript, library

      bin: asciidoctor, asciidoctorjs

      dist
      .tarball: https://registry.npmjs.org/asciidoctor/-/asciidoctor-2.2.6.tgz

      dependencies:
      @asciidoctor/cli: 3.5.0  @asciidoctor/core: 2.2.6

      dist-tags:
      latest: 2.2.6        

      published a year ago by ggrossetie <ggrossetie@gmail.com>
      ian@ian-ManjSda11:~$ npm info  asciidoc

README_NEW.md   20231224

Latest update with Ctrl-Alt-Shft-F to open external Folkon browser which gives a realistic working version of adoc file.

My version of an asciidoc-preview "ianasciidocpreview-active-editor-info"
========================================================================
This file can be found in ianasciidocpreview-active-editor-info/README.md

This is my first attempt at developing a pulsar package. This is designed to replace asciidoc-preview which fails to preview asciidoc files in pulsar or atom after v1.60 and I find it works in pulsar v1.100.
This package ianasciidocpreview-active-editor-info has been developed from the package active-editor-info from  Hacking Pulsar.
It does work to render asciidoc files in a separate pane which can be scrolled or dragged to view the content and resized in width. It can be zoomed using key combination  Ctrl+Shift+Alt+ along with + or -. There are a few quirks and unexpected behaviours which are described below.
This is a development package and I am asking advice on how to resolve various problems from people who know more about pulsar, atom and node than I.  Be aware that I take no responsibility for any untoward effects that installing package may have on your computer system: so be warned!
In particular it might be better to replace innerHTML() with setHTML() which is supposed to sanitise any html before it is generated.

I would suggest that anyone interested follow the guide below on how to install and use the package. I have recently put it on github which is a new experience for me so please bear with any teething problems which there will be.   https://github.com/ianwillie/ianasciidocpreview-active-editor-info

Thanks for the help I have received up to now, particularly from @confused-Techie & @Maurício Szabo.

I hope this is of help to someone.

Brief Summary to get you going
=============================
This package will preview an asciidoc file in pulsar. Open an .adoc file in pulsar. To preview use the key combination ctrl-alt-shift-Y.   A preview window should open in the RIght dock. Only files with extensions ".adoc", ".asciidoc", ".ad", ".asc", ".txt" are recognised as asciidoctor files and only these can be previewed. Files with other extensions are ignored ane the previous preview will remain. Note: markdown files (with extension .md for example) cannot be rendered properly by asciidoctor.js. They would need to be translated from md to asciidoctor first.

The preview can be zoomed with ctrl-shift+alt along with + or - to zoom in or out.  (In keymaps these appear as "ctrl-alt-Y", "ctrl-alt-+""ctrl-alt-_" )

In addition to showing a preview three files are written out in temp folder in the default directory:
    temp/htmloutputFileRawFromAsciidoc.html - the raw output from asciidoctor.js without any html headers like html, head, body tags. It seems to open OK in browsers.

    temp/iansasciidocpreviewhtmloutput.html - the output from asciidoctor.js which is a complete html document with html, head & body tags and content and styling  added by by my program. This is the file that is opened in Falkon browser (see below for details.)

    temp/iansasciidocpreviewtransformscale.txt - which contains the current zoom factor which is written when Ctrl-Shift-Alt- is pressed along with + or -. This file is read by the preview pane to control the zoom factor. ( As an aside, if the zoom factor figure is edited in this file and the file saved that will become the zoom of the preview. However, a console.log error message may appear about zoom factor not matching: just ignore this. )

    There may be other temporary files which are generated when the var consprint = true is set in ianasciidocpreview-active-editor-info-view.js. By default consprint is false and most console.log messages are inhibited.

    If any of these files is edited or deleted they will be recreated by the program when a file is previewed. The zoom will default to 1.00.

Installation
============
You may need to install asciidoctor.js  with npm. See below for details and https://docs.asciidoctor.org/asciidoctor.js/latest/setup/install/

Download from https://github.com/ianwillie/ianasciidocpreview-active-editor-info  either a zip or clone it.

There are different ways to install and you might either: 1. copy the files to the directory ~/.pulsar/packages/ianasciidocpreview-active-editor-info or
2. create a symbolic link between ~/.pulsar/packages/ianasciidocpreview-active-editor-info and the unzipped directory.  (~ stands for /home/<yourname>)

Restart pulsar and the program should be install. If it is not installed check that the directory is accessible to the .pulsar/packages directory.  (This program was developed using <MyDownloadDirectory>/pulsar-1.110.0/pulsar . --no-sandbox )  Your command to start pulsar may be different.

Open the preview
================
To try the packages navigate to ~/.pulsar/packages/ianasciidocpreview-active-editor-info and click on the asciidoc file  asciidoc_syntax_Long.adoc which will be in the temp directory.  This should open in an editor pane. Now place the cursor within it. To toggle the preview of the file press Ctrl-Alt-Shift-Y together.

Run the asciidoc previewing program by making sure the cursor is in the .adoc editor window and pressing together Ctrl-Alt-Shift-Y, or, Ctrl-Shift-P and entering "ianasciidocpreview-active-editor-info: toggle", or, from the Menu  Packages>ianasciidocpreview-active-editor-info: toggle. Note that the cursor must be in the .adoc (or .md or .txt) source editor pane when you do either of these or the preview pane will remain blank. However, once the preview pane has appeared it will show a preview of any asciidoc souce file that is opened for veiwing in pulsar.

You should see a panel open on the right showing the file rendered with by asciidoctor.js.  It may be necessary to enter the last command more than once because Ctrl-Alt-Shift-Y is a toggle to display or remove the preview panel.

Now if you click on to open  asciidoc_syntax.adoc you will see scroll bars. Mouse dragging works but up/down arrow work and PgUp & PgDown do not work yet. Your setup may give different results so try various ways of scolling.

The preview can be zoomed with ctrl-shift+alt along with + or - to zoom in or out.  (In keymaps these appear as "ctrl-alt-Y", "ctrl-alt-+""ctrl-alt-_" )

There will be several .adoc files in the ~/.pulsar/packages/ianasciidocpreview-active-editor-infos directory of different sizes. The smallest asciidoc_syntax_VShort.adoc  will show no vertical scroll bars because it does not fill the fixed height pare. The largest file asciidoc_syntax.adoc has many lines and should show vertical scrollbars. If you navigate right to the end there is a media file which should run with sound, full screen and so on when you click the arrow. (asciidoc_syntax.adoc is an old version of the asciidoctor syntax demo file for latest syntax look at the asciidoctor website.) Links to external URLs will operate but internal website links will not be expected to operate because these may not exist in accessible locations. In the preview internal anchor links like `<a href=#mytarget >` , adressing a tag containing an id like id="mytarget", do not work at the moment. However, they do work if the generated temp/iansasciidocpreviewhtmloutput.html file is opened in a browser.

The adoc preview panel can be closed with the top-right X. The left edge can be clicked and dragged to enlarge. The vertical size is set in pixels in the program otherwise the scroll is not activated. If relative height, say a percentage, is used scrollbars do not show.  Maintaining a sensible layout during horizontal stretching of the window seems to work but the L & R margins go a bit off sometimes.     (The height of the preview pane is set to match my screen and until I find out how to find the pulsar window height in javascript it will be a fixed`size in the app.)

The adoc preview panel can be closed with the top-right X. The left edge can be clicked and dragged to enlarge. The vertical size is set in pixels in the program otherwise the scroll is not activated. If relative height, say a percentage, is used scrollbars do not show.  Maintaining a sensible layout during horizontal stretching of the window seems to work but the L & R margins go a bit off sometimes.     (The height of the preview pane is set to match my screen and until I find out how to find the pulsar window height in javascript it will be a fixed`size in the app.)

Preview in external browser
======================

The adoc file can be previewed in an external browser by executing Ctrl-Alt-Shft-F or Ctrl-Shft-P plus command. This is set up to open with the browser Falkon which has the advantage that it out-of-the-box refreshes  when the source file is saved without setting up a local server. Repeat Ctrl-Alt-Shft-F if external browser looses sync with the .adoc file and to give focus to this browser which brings it infont of other windows.


Console.log messages
==================
The app has (too) many console.log message generated for diagnostic purposes during development. To see if there are significant errors when the app is run, I suggest that you filter the output using "err" which will show only error messages that  require your attention, and the degugging messages will be filtered out.

To see what is happening use the console.log. Output to this is dictated by  "const consprint = false;". Open ~/.pulsar/packages/lib/ianasciidocpreview-active-editor-info-view.js and change to "const consprint = true;", without the quotes.Press Ctrl-Shift-I to turn on the console. You may need --no-sandbox on the pulsar command line for this to work. Then use Ctr-Alt-Shift-Y.


Help needed
==========

I could do with help on these issues which are evident at the moment.

I have worked out how to get scroll bars on the preview pane by editing the generated html code but they only appear when the height of the pane is fixed in pixels: at themoment 90% of the window height in pixesl. If it is given in % or rem there are no scrollbars and no other scrolling operates.

I have worked out how to zoom the preview pane by incorporating the chrome zoom style  <div  style="zoom: zoomScale;"> inside the <body> tag.  The keyboard input of - or + is saved in temp/iansasciidocpreviewtransformscale.txt when "ctrl-alt-+""ctrl-alt-_" are pressed or Command Palette> iansasciidocpreview Active Editor Info: TransformScaleUp or TransformScaleDown is invoked. There is also a command in the Menu. When this text file is saved automatically the relevant zoomScale is updated in the html element.

The preview changes as a new asciidoc file is selected and then when any changes are saved. How can I get the title of the preview pane to match that of the asciidoc file?

I hope to get some degree of scrolling so that they adoc and preview are in sync because asciidoctor.js can output data that might help with this. How can I tell the preview pane which line to scroll to when it refreshes after the asciidoc file is scrolled.  Links href="#mytarget"  which should jump to <div id="mytarget" > do not seem to be functional in the  review in Pulsar. They operate just fine when temp/iansasciidocpreviewhtmloutput.html is opened in a browser with Ctrl-Alt-Shft-F. I surmise that in Pulsar there should be something like the URI prepended to #mytarget.


Quirks
======
You will see no changes in the preview until you save the adoc file. Actually this is by design because I find constant preview changes as I type distracting.

You will see error messages in the console about media files not found in the asciidoc syntax file - but click on Show on Youtube and it works.

There are messages about missing css style files but the default asciidoc css file will be operating, I think.  I need to check this more.

Most of the URLs will not work because they are local files and the base directory is not set. I surmise that Pulsar requires something like a URL to be prepended to the link. However, web urls will show by being opened in your default browser, like Chrome or Firefox. All links do work asexpected in the external browser called with Ctrl-Alt-Shift-F.

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
Tests are not implementedyet. These taht relate to the original active-editor-info should be ignored.


Asciidoctor.js installation information from my system:  (20230416)
=================================================================
      $ npm info  asciidoctor

      asciidoctor@3.0.2 | MIT | deps: 6 | versions: 30
  A JavaScript AsciiDoc processor, cross-compiled from the Ruby-based AsciiDoc implementation, Asciidoctor, using Opal
  https://github.com/asciidoctor/asciidoctor.js

  keywords: asciidoc, asciidoctor, opal, javascript, library

  bin: asciidoctor, asciidoctorjs

  dist
  .tarball: https://registry.npmjs.org/asciidoctor/-/asciidoctor-3.0.2.tgz
  .shasum: 1bf36902c4aa14f3aebf6bb8d1fc65e8676d0e8f
  .integrity: sha512-Au4L8tlwzvxP9y6cisTC/OZJbOUL7ii1jPW3li/XZWk8ZQrGdzbTFB9rN782V4dXxJoYKbcuHF8cBRQDg5+w9Q==
  .unpackedSize: 129.1 kB

  dependencies:
  @asciidoctor/cli: 4.0.0  ejs: ^3.1.2              nunjucks: ^3.2.1         
  @asciidoctor/core: 3.0.2 handlebars: ^4.7.6       pug: ^2.0.4              

  maintainers:
  - ggrossetie <ggrossetie@gmail.com>

  dist-tags:
  latest: 3.0.2        testing: 3.0.0-rc.2  

  published 6 months ago by ggrossetie <ggrossetie@gmail.com>

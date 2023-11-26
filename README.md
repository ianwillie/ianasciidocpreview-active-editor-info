README_NEW.md   20231108   

My version of an asciidoc-preview "ianasciidocpreview-active-editor-info"
========================================================================
This file can be found in ianasciidocpreview-active-editor-info/

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
This package will preview an asciidoc file in pulsar. Open an .adoc file in pulsar. To preview use the key combination ctrl-alt-shift-Y.   A preview window should open in the RIght dock.

The preview can be zoomed with ctrl-shift+alt along with + or - to zoom in or out.  (In keymaps these appear as "ctrl-alt-Y", "ctrl-alt-+""ctrl-alt-_" )

In addition to showing apreview three files are written out in temp folder in the default directory:
    temp/htmloutputFileRawFromAsciidoc.html - the raw output from asciidoctor.js without any html headers like html, head, body tags. It seems to open OK in browsers.
    temp/iansasciidocpreviewhtmloutput.html - the output from asciidoctor.js which is a complete html document with html, head & body tags and content and styling  added by by my program.
    temp/iansasciidocpreviewtransformscale.txt - which contains the current zoom factor which is written when Ctrl-Shift-Alt- is pressed along with + or -. This file is read by the preview pane to control the zoom factor.
    NB There is a bug at the moment which leaves temp/iansasciidocpreviewtransformscale.txt on the desk top containing the zoom factor: a figure like 0.80, 1.00 or 1.20 . The file should close automatically but it stays open and it is necessary to close the tab with top right hand x, Ctrl-W or Command Console core:close.  As an aside, if the zoom factor figure is edited and the file saved that will become the zoom of the preview. However, a console.log error message may appear about zoom factor not matching: ignore this.

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
To try the packages navigate to ~/.pulsar/packages/ianasciidocpreview-active-editor-info and click on the asciidoc file  asciidoc_syntax_Long.adoc.  This should open in an editor pane and now place the cursor within it. There will be several .adoc files in this directory but you need to select a long one so that the scrollbars become visible.Alternatively, copy asciidoc_syntax_Long.adocto your working directory and open it in pulsar. This file is based on that distributed with an older version of Asciidoctor which demonstrates all the syntax.
Run the asciidoc previewing program by making sure the cursor is in the .adoc editor window and pressing together Ctrl-Alt-Shift-Y, or, Ctrl-Shift-P and entering ianasciidocpreview-active-editor-info: toggle, or, Menu  Packages>ianasciidocpreview-active-editor-info: toggle. Note that the cursor must be in the .adoc source editor pane when you do either of these or the preview pane will not appear.

You should see a panel open on the right showing the rendered asciidoc file.  It may be necessary to enter the last command more than once because Ctrl-Alt-Shift-Y is a toggle to display or undisplay the preview panel.

Now if you click on to open  asciidoc_syntax.adoc you will see scroll bars. Mouse dragging works but up/down arrow work and PgUp & PgDown do not work yet. Your setup may give different results so try various ways of scolling.

The preview can be zoomed with ctrl-shift+alt along with + or - to zoom in or out.  (In keymaps these appear as "ctrl-alt-Y", "ctrl-alt-+""ctrl-alt-_" )

There will be several .adoc files in the ~/.pulsar/packages/ianasciidocpreview-active-editor-infos directory of different sizes. The smallest asciidoc_syntax_VShort.adoc  will show no vertical scroll bars because it does not fill the fixed height pare. The largest file asciidoc_syntax.adoc has many lines and should show vertical scrollbars. If you navigate right to the end there is a media file which should run with sound, full screen and so on when you click the arrow. (asciidoc_syntax.adoc is an old version of the asciidoctor syntax demo file for latest syntax look at the asciidoctor website.) Links to external URLs will operate but internal website links will not be expected to operate because these may not exist in accessible locations. In the preview internal anchor links generated from <a href=#mytarget >  adressing a tag containing an id like id="mytarget" do not work at the moment. However, they do work if the generated temp/iansasciidocpreviewhtmloutput.html file is opened in a browser.

The adoc preview panel can be closed with the top-right X. The left edge can be clicked and dragged to enlarge. The vertical size is set in pixels in the program otherwise the scroll is not activated. Maintaining a sensible layout during horizontal stretching of the window seems to work but the L & R margins go a bit off sometimes.

Console.log messages
====================

The app has (too) many console.log message generated for diagnostic purposes during development. The see if there are significant errors when the app is run, I suggest that you filter the output using "err" which will show only error messages which will probably require your attention.  Most of the degugging messages will be filtered out.

To see what is happening use the console.log. Output to this is dictated by "const consprint = false;". Open ~/.pulsar/packages/lib/ianasciidocpreview-active-editor-info-view.js and change to "const consprint = true;", without the quotes.Press Ctrl-Shift-I to turn on the console. You may need --no-sandbox on the pulsar command line for this to work. Then use Ctr-Alt-Shift-Y.





## Help needed

I could do with help on these issues which are evident at the moment.

I have worked out how to get scroll bars on the preview pane by editing the generated html code but they only appear when the height of the pane is fixed in pixels. If it is given in % or rem there are no scrollbars and no other scrolling operates. How can I find the total window height of Pulsar so that I can calculate an appropriate height?
I have worked out how to zoom the preview pane by incorporating "transform: scale(factor)". How can I get user input of the preferred scale factor while the program runs. Pulsar does not seem to allow user input. There seem to be suggestions that this might be possible found from DuckDuckGo but there are no precise details of how to achieve this.  There seem to be 3 ways:
1. Ask user to input a digital text factor like 0.8, 1 or 1.5 in a text box,
2. Capture key strokes like ctrl-+ or ctrl--, choosing some combination that is unique for that pulsar setup,
3. Use radio button marked like 0.2, 0.4, ... 1 ... 1.5 ...2
Can anyone point me in the direction of how to get input from the user while the package runs. There is little point in putting the zoom factor in the config setup because it is handy to be able to change it to see more or less of the previewed content.

The preview changes as a new asciidoc file is selected and then when any changes are saved. How can I get the title of the preview pane to match that of the asciidoc file?

I hope to get some degree of scrolling so that they adoc and preview are in sync because asciidoctor.js can output data that might help with this.


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

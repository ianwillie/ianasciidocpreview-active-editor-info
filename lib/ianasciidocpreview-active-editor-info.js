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
          if (uri === "atom://ianasciidocpreview-active-editor-info") {
            return new IanasciidocpreviewActiveEditorInfoView();
          }
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

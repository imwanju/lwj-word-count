'use babel';

import LwjWordCountView from './lwj-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  lwjWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lwjWordCountView = new LwjWordCountView(state.lwjWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lwjWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lwj-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lwjWordCountView.destroy();
  },

  serialize() {
    return {
      lwjWordCountViewState: this.lwjWordCountView.serialize()
    };
  },

  toggle() {
    console.log('LwjWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

import { Block } from '../block';
import template from './notecard.pug';

/* eslint-disable */
import _ from './notecard.scss';
/* eslint-enable */

export class NoteCard extends Block {
  get bemName () {
    return 'note-card';
  }
  template (data) {
    return template(data);
  }
  set value ({ title, noteText }) {
    this.noteTitle.innerHTML = title;
    if (noteText.length > 40) {
      noteText = noteText.slice(0, 40) + '...';
    }
    this.noteText.innerHTML = noteText;
  }
  render (el) {
    super.render(el);
    this.noteTitle = this.getElement('note-title');
    this.noteText = this.getElement('note-text');
    this.value = this.options;
  }
}

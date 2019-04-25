import { Block } from '../block';
import template from './viewbox.pug';

/* eslint-disable */
import _ from './viewbox.scss';
/* eslint-enable */

export class ViewBox extends Block {
  get bemName () {
    return 'viewbox';
  }
  template (data) {
    return template(data);
  }
  set value ({ title, noteText }) {
    this.noteTitle.innerText = title;
    this.noteText.innerText = noteText;
  }
  clear () {
    this.noteTitle.innerText = '';
    this.noteText.innerText = '';
  }
  render (el) {
    super.render(el);
    this.noteTitle = this.getElement('note-title');
    this.noteText = this.getElement('note-text');
  }
}

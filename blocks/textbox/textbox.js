import { Block } from '../block';
import template from './textbox.pug';
/* eslint-disable */
import _ from './textbox.scss';
/* eslint-enable */

export class Textbox extends Block {
  get bemName () {
    return 'textbox';
  }
  template (data) {
    return template(data);
  }
  get value () {
    if (this.options.required && this.getElement('input').value === '') {
      this.getElement('input').classList.toggle('textbox__input_error', true);
      return false;
    }
    this.getElement('input').classList.toggle('textbox__input_error', false);
    return this.getElement('input').value;
  }
}

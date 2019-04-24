import { Block } from '../block';
import template from './textareabox.pug';
/* eslint-disable */
import _ from './textareabox.scss';
/* eslint-enable */

export class Textareabox extends Block {
  get bemName () {
    return 'textareabox';
  }
  template (data) {
    return template(data);
  }
  get value () {
    return this.getElement('textarea').innerText;
  }
}

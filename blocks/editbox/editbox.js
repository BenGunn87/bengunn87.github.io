import { Block } from '../block';
import { Textareabox } from '../textareabox/textareabox';
import { Textbox } from '../textbox/textbox';
import template from './editbox.pug';

/* eslint-disable */
import _ from './editbox.scss';
/* eslint-enable */

export class EditBox extends Block {
  get bemName () {
    return 'editbox';
  }
  constructor (option) {
    super(option);
    this.noteTitle = new Textbox({
      name: 'note-title',
      label: 'Заголовок',
      value: '',
      required: false,
      type: 'text'
    });
    this.noteTextarea = new Textareabox({
      name: 'note-textarea',
      label: 'Заметка',
      value: '',
      required: false
    });
  }
  template (data) {
    return template(data);
  }
  get value () {
    const result = {};
    result.title = this.noteTitle.value();
    result.noteText = this.noteTextarea.value();
    return result;
  }
  set value ({ title, noteText }) {
    this.noteTitle.value = title;
    this.noteTextarea.value = noteText;
  }
  render (el) {
    super.render(el);
    this.noteTitle.render(this.getElement('note-title'));
    this.noteTextarea.render(this.getElement('note-textarea'));
  }
}

import { Block } from '../block';
import { Textbox } from '../textbox/textbox';
import { NoteCard } from '../notecard/notecard';
import template from './notecardlist.pug';

/* eslint-disable */
import _ from './notecardlist.scss';
/* eslint-enable */

export class NoteCardList extends Block {
  get bemName () {
    return 'note-card-list';
  }
  constructor (options = {}) {
    super(options);
    this.search = new Textbox({
      name: 'search',
      label: 'Поиск',
      value: '',
      required: false,
      type: 'text'
    });
    this.noteList = [];
    this.noteCardList = {};
    if (options.cardList) {
      for (let note of options.cardList) {
        const noteCard = new NoteCard({
          noteid: note.noteid,
          title: note.title,
          noteText: note.noteText
        });

        this.noteList.push({
          noteid: note.noteid,
          visible: true
        });
        this.noteCardList[note.noteid] = { 'noteCard': noteCard };
      }
    }
  }
  template (data) {
    return template(data);
  }
  render (el) {
    super.render(el);
    this.search.render(this.getElement('search'));
    this.list = this.getElement('list');
    for (let note of this.noteList) {
      const tmpdiv = document.createElement('div');
      this.noteCardList[note.noteid].noteCard.render(tmpdiv);
      note.el = tmpdiv;
      this.list.insertBefore(note.el, this.list.firstChild);
    };
  }
}

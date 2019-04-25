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
        this.noteCardList[note.noteid] = {'noteCard': noteCard};
      }
    }
  }

  template (data) {
    return template(data);
  }

  addNote ({ noteid, title, noteText }) {
    const noteCard = new NoteCard({
      noteid: noteid,
      title: title,
      noteText: noteText
    });

    this.noteList.push({
      noteid: noteid,
      visible: true
    });
    this.noteCardList[noteid] = { 'noteCard': noteCard };
    const tmpdiv = document.createElement('div');
    noteCard.render(tmpdiv);
    this.list.insertBefore(tmpdiv, this.list.firstChild);
    return noteCard;
  }
  updNote ({ noteid, title, noteText }) {
    this.noteCardList[noteid].noteCard.value = {
      title: title,
      noteText: noteText
    }
  }
  searchFn (searchString) {
    for (let item of this.noteList) {
      item.visible = (this.noteCardList[item.noteid].noteCard.options.title.toUpperCase().indexOf(searchString) !== -1 ||
          this.noteCardList[item.noteid].noteCard.options.noteText.toUpperCase().indexOf(searchString) !== -1);
      this.noteCardList[item.noteid].noteCard.el.hidden = !item.visible;
    }
  }
  render (el) {
    super.render(el);
    this.search.render(this.getElement('search'));
    this.list = this.getElement('list');
    for (let note of this.noteList) {
      const tmpdiv = document.createElement('div');
      this.noteCardList[note.noteid].noteCard.render(tmpdiv);
      this.list.insertBefore(tmpdiv, this.list.firstChild);
    }
  }
}

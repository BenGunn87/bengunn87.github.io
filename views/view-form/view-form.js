import { ViewBox } from '../../blocks/viewbox/viewbox';
import { NoteCardList } from '../../blocks/notecardlist/notecardlist';
import { ButtonsPanel } from '../../blocks/buttonspanel/buttonspanel';
import { NoteList } from '../../model/notelist';
import { View } from '../view';
import template from './view-form.pug';

/* eslint-disable */
import _ from './view-form.scss';
/* eslint-enable */

export class ViewForm extends View {
  get bemName () {
    return 'view-form';
  }

  template (data) {
    return template(data);
  }

  constructor (options) {
    super(options);
    this.buttonsPanel = new ButtonsPanel({
      btnone: {
        name: 'btnadd',
        value: '+'
      },
      btntwo: {
        name: 'btndel',
        value: '-'
      }
    });
    this.viewBox = new ViewBox();
    this.noteListData = new NoteList();
    this.noteCardList = new NoteCardList(options);
  }

  render (el) {
    super.render(el);
    this.buttonsPanel.render(this.getElement('buttonspanel'));
    this.buttonsPanel.btnAdd.setOnClick(() => {
      window.location.hash = '#edit';
    });
    this.viewBox.render(this.getElement('viewbox'));
    this.noteCardList.render(this.getElement('note-card-list'));
    for (let noteKey in this.noteListData.noteList) {
      if (this.noteListData.noteList.hasOwnProperty(noteKey)) {
        this.noteCardList.addNote(this.noteListData.noteList[noteKey]);
      }
    }
  }
}

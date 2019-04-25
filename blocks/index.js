import { Textbox } from './textbox/textbox';
import { Button } from './button/button';
import { ButtonsPanel } from './buttonspanel/buttonspanel';
import { Textareabox } from './textareabox/textareabox';
import { EditBox } from './editbox/editbox';
import { MainBox } from './mainbox/mainbox';
import { ViewBox } from './viewbox/viewbox';
import { NoteCard } from './notecard/notecard';
import { NoteCardList } from './notecardlist/notecardlist';
import { ViewForm } from '../views/view-form/view-form';
import { EditForm } from '../views/edit-form/edit-form';
import { Router } from '../libs/router';
import { Note } from '../model/note';
import { NoteList } from '../model/notelist';

/* eslint-disable */
import _ from './index.scss';
/* eslint-enable */

window.Textbox = Textbox;
window.Button = Button;
window.Textareabox = Textareabox;
window.EditBox = EditBox;
window.ButtonsPanel = ButtonsPanel;
window.MainBox = MainBox;
window.ViewBox = ViewBox;
window.NoteCard = NoteCard;
window.NoteCardList = NoteCardList;
window.ViewForm = ViewForm;
window.EditForm = EditForm;
window.Note = Note;
window.NoteList = NoteList;

window.addEventListener('DOMContentLoaded', () => {
  const viewForm = new ViewForm();
  const editForm = new EditForm();
  const mainBoxEdit = new MainBox();
  const mainBoxView = new MainBox();
  const router = new Router();
  let editNoteId = 0;

  mainBoxEdit.render(document.querySelector('.js-edit-form'));
  editForm.render(mainBoxEdit.el.querySelector('.mainbox'));

  mainBoxView.render(document.querySelector('.js-view-form'));
  viewForm.render(mainBoxView.el.querySelector('.mainbox'));

  router.register('view', viewForm, true);
  router.register('edit', editForm);
  router.start();

  // Добавление заметки
  editForm.buttonsPanel.btnAdd.setOnClick(() => {
    const noteValue = editForm.editBox.value;
    if (editNoteId === 0) {
      if (noteValue.title || noteValue.noteText) {
        const newNote = viewForm.noteListData.addNote(noteValue);
        const newEl = viewForm.noteCardList.addNote(newNote).el;
        const currentActiveEl = viewForm.noteCardList.el.querySelector('.note-card-list__card-active') || {};
        if (currentActiveEl.classList) {
          currentActiveEl.classList.remove('note-card-list__card-active');
        }
        newEl.firstElementChild.classList.add('note-card-list__card-active');
        viewForm.viewBox.value = newNote;
      }
    } else {
      // Редактирование заметки
      viewForm.noteListData.updNote({
        noteid: editNoteId,
        title: noteValue.title,
        noteText: noteValue.noteText
      });
      viewForm.noteCardList.updNote({
        noteid: editNoteId,
        title: noteValue.title,
        noteText: noteValue.noteText
      });
      viewForm.viewBox.value = noteValue;
      editNoteId = 0;
    }
    editForm.editBox.clear();
    window.location.hash = '#view';
  });
  // Удаление заметки
  viewForm.buttonsPanel.btnBack.setOnClick(() => {
    const currentActiveEl = viewForm.noteCardList.el.querySelector('.note-card-list__card-active');
    if (currentActiveEl) {
      const noteid = +currentActiveEl.dataset.noteid;
      currentActiveEl.parentNode.remove();
      viewForm.noteListData.delNote(noteid);
      viewForm.viewBox.clear();
    }
  });
  // Выделение элемента
  viewForm.noteCardList.el.onclick = event => {
    let target = event.target;
    while (target !== viewForm.noteCardList.el) {
      if (target.classList.contains('note-card')) {
        const currentActiveEl = viewForm.noteCardList.el.querySelector('.note-card-list__card-active') || {};
        if (target === currentActiveEl) return;
        if (currentActiveEl.classList) {
          currentActiveEl.classList.remove('note-card-list__card-active');
        }
        target.classList.add('note-card-list__card-active');
        const noteid = +target.dataset.noteid;
        viewForm.viewBox.value = viewForm.noteListData.noteList['note-' + noteid];
        return;
      }
      target = target.parentNode;
    }
  };
  // Открытие на редактирование
  viewForm.noteCardList.el.ondblclick = event => {
    let target = event.target;
    while (target !== viewForm.noteCardList.el) {
      if (target.classList.contains('note-card')) {
        editNoteId = +target.dataset.noteid;
        editForm.editBox.value = viewForm.noteListData.noteList['note-' + editNoteId];
        window.location.hash = '#edit';
        return;
      }
      target = target.parentNode;
    }
  };
  // поиск
  viewForm.noteCardList.search.el.querySelector('input').onchange = event => {
    viewForm.viewBox.clear();
    const currentActiveEl = viewForm.noteCardList.el.querySelector('.note-card-list__card-active') || {};
    if (currentActiveEl.classList) {
      currentActiveEl.classList.remove('note-card-list__card-active');
    }
    viewForm.noteCardList.searchFn(event.target.value.toUpperCase());
  }
});

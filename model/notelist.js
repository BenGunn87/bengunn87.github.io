import { Note } from './note';

export class NoteList {
  constructor () {
    if (!localStorage['maxNoteId']) {
      localStorage.setItem('maxNoteId', 0);
      localStorage.setItem('noteArr', JSON.stringify({}));
    }
    this.maxNoteId = +localStorage.getItem('maxNoteId');

    this.ListNoteId = JSON.parse(localStorage.getItem('noteArr'));
    this.noteList = {};
    for (let noteid in this.ListNoteId) {
      if (this.ListNoteId.hasOwnProperty(noteid)) {
        this.noteList[noteid] = new Note(JSON.parse(localStorage.getItem(noteid)));
      }
    }
  }
  delNote (noteid) {
    this.noteList['note-' + noteid].delNote();
    delete this.ListNoteId['note-' + noteid];
    delete this.noteList['note-' + noteid];
    localStorage.setItem('noteArr', JSON.stringify(this.ListNoteId));
  }
  getId () {
    this.maxNoteId += 1;
    localStorage.setItem('maxNoteId', this.maxNoteId);
    return this.maxNoteId;
  }
  addNote ({ title, noteText }) {
    let noteid = this.getId();
    this.noteList['note-' + noteid] = new Note({
      'noteid': noteid,
      'title': title,
      'noteText': noteText
    });
    this.ListNoteId['note-' + noteid] = noteid;
    localStorage.setItem('noteArr', JSON.stringify(this.ListNoteId));
    this.noteList['note-' + noteid].saveNote();
    return this.noteList['note-' + noteid];
  }
  updNote ({ noteid, title, noteText }) {
    this.noteList['note-' + noteid] = new Note({
      'noteid': noteid,
      'title': title,
      'noteText': noteText
    });
    this.noteList['note-' + noteid].saveNote();
    return this.noteList['note-' + noteid];
  }
}

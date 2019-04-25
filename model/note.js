export class Note {
  /**
   * Добавление заметки
   * @param {Object} options
   */
  constructor (options = {}) {
    this.noteid = options.noteid;
    this.title = options.title;
    this.noteText = options.noteText;
  }

  updateNote ({ noteid, title, noteText }) {
    this.noteid = noteid;
    this.title = title;
    this.noteText = noteText;
    localStorage.setItem('note-' + noteid, JSON.stringify(this));
  };
  delNote () {
    localStorage.removeItem('note-' + this.noteid);
  };
  saveNote () {
    localStorage.setItem('note-' + this.noteid, JSON.stringify(this));
  };
}

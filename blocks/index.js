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

window.addEventListener('DOMContentLoaded', () => {
  const viewForm = new ViewForm();
  const editForm = new EditForm();
  const mainBoxEdit = new MainBox();
  const mainBoxView = new MainBox();
  const router = new Router();

  mainBoxEdit.render(document.querySelector('.js-edit-form'));
  editForm.render(mainBoxEdit.el.querySelector('.mainbox'));

  mainBoxView.render(document.querySelector('.js-view-form'));
  viewForm.render(mainBoxView.el.querySelector('.mainbox'));

  router.register('view', viewForm, true);
  router.register('edit', editForm);
  router.start();
})

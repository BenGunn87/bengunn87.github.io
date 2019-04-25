import { EditBox } from '../../blocks/editbox/editbox';
import { ButtonsPanel } from '../../blocks/buttonspanel/buttonspanel';
import { View } from '../view';
import template from './edit-form.pug';

/* eslint-disable */
import _ from './edit-form.scss';
/* eslint-enable */

export class EditForm extends View {
  get bemName () {
    return 'edit-form';
  }

  template (data) {
    return template(data);
  }

  constructor (options = {}) {
    super(options);
    this.buttonsPanel = new ButtonsPanel();
    this.editBox = new EditBox();
  }

  render (el) {
    super.render(el);
    this.buttonsPanel.render(this.getElement('buttonspanel'));
    this.buttonsPanel.btnBack.setOnClick(() => {
      window.location.hash = '#view';
    });
    this.editBox.render(this.getElement('editbox'));
    if (this.options.value) {
      this.editBox.value = this.options.value;
    }
  }
}

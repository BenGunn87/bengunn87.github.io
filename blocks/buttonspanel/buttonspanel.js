import { Block } from '../block';
import { Button } from '../button/button';
import template from './buttonspanel.pug';

/* eslint-disable */
import _ from './buttonspanel.scss';
/* eslint-enable */

/**
 * class ButtonsPanel
 * @param {Object} {name, value, type}
 */

export class ButtonsPanel extends Block {
  get bemName () {
    return 'buttons-panel';
  }
  constructor (options = {}) {
    super(options);
    if (options.btnone) {
      this.btnAdd = new Button(options.btnone);
    } else {
      this.btnAdd = new Button({
        name: 'btnadd',
        value: '+'
      });
    }
    if (options.btntwo) {
      this.btnBack = new Button(options.btntwo);
    } else {
      this.btnBack = new Button({
        name: 'btnback',
        value: '<'
      });
    }
  }
  template (data) {
    return template(data);
  }
  render (el) {
    super.render(el);
    this.btnAdd.render(this.getElement('btnadd'));
    this.btnBack.render(this.getElement('btnback'));
  }
}

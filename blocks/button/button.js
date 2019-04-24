import { Block } from '../block';
import template from './button.pug';
/* eslint-disable */
import _ from './button.scss';
/* eslint-enable */

/**
 * class Button
 * @param {Object} {name, value, type}
 */

export class Button extends Block {
  get bemName () {
    return 'button';
  }
  template (data) {
    return template(data);
  }
}

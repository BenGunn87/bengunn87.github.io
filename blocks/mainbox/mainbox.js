import { Block } from '../block';
import template from './mainbox.pug';

/* eslint-disable */
import _ from './mainbox.scss';
/* eslint-enable */

export class MainBox extends Block {
  get bemName () {
    return 'mainbox';
  }
  template (data) {
    return template(data);
  }
}

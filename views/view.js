import { Block } from '../blocks/block';

export class View extends Block {
  render (el, state = true) {
    super.render(el);
    this.el.hidden = state;
  }

  toggle (state) {
    this.el.hidden = !state;
  }
}

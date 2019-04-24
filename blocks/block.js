export class Block {
  get bemName () {
    return 'block';
  }
  constructor (options) {
    this.options = options;
  }

  template () {
    console.warn(`у компонента не определен шаблон`);
  }

  /**
   * Метод получает элемент блока по его имени, если элементов много,
   * то вернется первый
   * @param {string} name - имя блока
   * @return {Element}
   */
  getElement (name) {
    return this.el.querySelector(`.${this.bemName}__${name}`);
  }

  render (el) {
    this.el = el;
    this.el.innerHTML = this.template(this.options);
  }
}

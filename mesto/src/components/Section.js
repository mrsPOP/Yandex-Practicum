export class Section {
  constructor (renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  addItem (element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    this.clear();

    items.forEach(item => {
      this._renderer(item);
    });
  }
}

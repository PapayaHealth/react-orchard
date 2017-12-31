import _ from 'lodash';
import 'url-search-params-polyfill';

export class URLSearch {
  constructor(search = null) {
    let initialSearch = search;

    // Instantiate URLSearchParams with provided search string or retrieve
    // from current location?
    if (initialSearch == null) {
      initialSearch = this._search();
    }

    this._initialize(initialSearch);
  }

  _initialize(search) {
    this.params = new URLSearchParams(search);

    return this;
  }

  _search() {
    return window.location.search;
  }

  all() {
    // Return object with all data
    let data = {};

    for (var key of this.params.keys()) {
      data[key] = this.params.getAll(key);
    }

    return data;
  }

  append(param, value) {
    this.params.append(param, value);

    return this;
  }

  delete(param) {
    this.params.delete(param);

    return this;
  }

  deleteSingle(param, value) {
    const currentParams = this.params.getAll(param);

    // Delete all
    this.params.delete(param);

    // Reappend all non-matching values
    currentParams.map((v) => {
      if (value != v) {
        this.params.append(param, v);
      }
    });

    return this;
  }

  fullPathString() {
    return `${window.location.pathname}?${this.toString()}`;
  }

  get(param) {
    return this.params.get(param);
  }

  has(param) {
    return this.params.has(param);
  }

  set(param, value) {
    this.params.set(param, value);

    return this;
  }

  toString() {
    return this.params.toString();
  }
}

export class AutoUpdatingURLSearch extends URLSearch {
  constructor() {
    super();
  }

  all() {
    this._initialize(this._search());

    return super.all();
  }

  append(param, value) {
    this._initialize(this._search());

    return super.append(param, value);
  }

  delete(param) {
    this._initialize(this._search());

    return super.delete(param);
  }

  deleteSingle(param, value) {
    this._initialize(this._search());

    return super.deleteSingle(param, value);
  }

  fullPathString() {
    this._initialize(this._search());

    return super.fullPathString();
  }

  get(param) {
    this._initialize(this._search());

    return super.get(param);
  }

  has(param) {
    this._initialize(this._search());

    return super.has(param);
  }

  set(param, value) {
    this._initialize(this._search());

    return super.set(param, value);
  }

  toString() {
    this._initialize(this._search());

    return super.toString();
  }
}

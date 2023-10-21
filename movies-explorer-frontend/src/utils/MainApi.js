import { TOKEN_KEY, BASE_URL } from './globalVariables';

class Api {
  constructor() {
    this._link = BASE_URL;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw JSON.parse(text).message || JSON.parse(text).error;
    });
  }

  async register({ email, password, name }) {
    const res = await fetch(`${this._link}/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name, email, password,
      })
    });
    return this._checkResponse(res);
  };

  async login({ email, password }) {
    const res = await fetch(`${this._link}/signin`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email, password,
      })
    });
    return this._checkResponse(res);
  };

  async getUserInfo() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token){
      throw Error('token в localStorage не найден')
    }
    const res = await fetch(`${this._link}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
    return this._checkResponse(res);
  }

  async setUserInfo({ name, email }) {
    const res = await fetch(`${this._link}/users/me `, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        email,
      }),
    });
    return this._checkResponse(res);
  }

  async getSavedMovies() {
    const res = await fetch(`${this._link}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    });
    return this._checkResponse(res);
  }

  async saveMovie({ ...data }) {
    const res = await fetch(`${this._link}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
      method: "POST",
      body: JSON.stringify({
        ...data
      }),
    });
    return this._checkResponse(res);
  }

  async deleteMovie(movieId) {
    const res = await fetch(`${this._link}/movies/${movieId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
      method: "DELETE",
    });
    return this._checkResponse(res);
  }
}

const api = new Api();

export default api;
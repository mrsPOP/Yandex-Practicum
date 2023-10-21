class Auth {
  constructor() {
    this.BASE_URL = "https://mrspop-mesto.nomoreparties.sbs/";
  }

  _fetch = async (url, options) => {
    const res = await fetch(url, options);
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Ошибка: ${res.status}`);
  };

  registrate({ email, password }) {
    const raw = JSON.stringify({ email, password });
    const url = this.BASE_URL + "signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    };
    return this._fetch(url, options);
  }

  authenticate(token) {
    const url = this.BASE_URL + "users/me";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return this._fetch(url, options);
  }

  authorizate({ email, password }) {
    const raw = JSON.stringify({ email, password });
    const url = this.BASE_URL + "signin";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    };
    return this._fetch(url, options);
  }
}

const auth = new Auth();

export default auth;

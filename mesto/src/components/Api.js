class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async _makeRequest(url, options) {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      });
  }

  getUserInfo() {
    return this._makeRequest(this.baseUrl + "/users/me", {
      method: "GET",
      headers: this.headers,
    });
  }

  getInitialCards() {
    return this._makeRequest(this.baseUrl + "/cards", {
      method: "GET",
      headers: this.headers,
    });
  }

  editProfileInfo ({name, about}) {
    return this._makeRequest(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  addNewCard ({name, link}) {
    return this._makeRequest(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard (cardId) {
    return this._makeRequest(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  like (cardId) {
    return this._makeRequest(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  unlike (cardId) {
    return this._makeRequest(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  changeAvatar (avatar) {
    return this._makeRequest(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    });
  }
}

export default Api

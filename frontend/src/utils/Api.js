class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
  }

  /*  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
  */

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setUserInfo(values, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then(this._checkResponse);
  }

  postCardServer(newInputValues, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newInputValues.name,
        link: newInputValues.link,
      }),
    }).then(this._checkResponse);
  }

  /*putCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        card: cardId,
      }),
    }).then(this._checkResponse);
  }

  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        card: cardId,
      }),
    }).then(this._checkResponse);
  }*/

  changeLikeCardStatus(cardId, notLiked, token) {
    if (notLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          card: cardId,
        }),
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          card: cardId,
        }),
      }).then(this._checkResponse);
    }
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setAvatar(value, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: value,
      }),
    }).then(this._checkResponse);
  }
}

// const api = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
//   headers: {
//     authorization: "f5c9f646-83a1-4941-8ba4-5e0e854925e0",
//     "Content-Type": "application/json",
//   },
// });

// const api = new Api({
//   baseUrl: 'http://localhost:3000',
// });

const api = new Api({
  baseUrl: 'https://api.stazzler.nomoredomains.work',
});


export default api;

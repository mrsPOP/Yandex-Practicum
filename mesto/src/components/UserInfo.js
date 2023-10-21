export class UserInfo {
  constructor ({profileName, profileDescription, avatarPicture}) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._avatarPicture = document.querySelector(avatarPicture);
  }

  getUserInfo () {
    return {'profile-name-input': this._profileName.textContent, 'profile-description-input': this._profileDescription.textContent}
  }

  setUserNameAbout (data) {
    this._profileName.textContent = data.name ;
    this._profileDescription.textContent = data.about;
  }

  getUserId () {
    return this._id;
  }

  setUserInfo (data) {
    this.setUserNameAbout(data);
    this._id = data._id;
    this.changeAvatar(data);
  }

  changeAvatar (data) {
    this._avatarPicture.src = data.avatar;
  }
}

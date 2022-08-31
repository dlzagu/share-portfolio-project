const USERTOKEN = "userToken";

class Storage {
  static setItem(item) {
    sessionStorage.setItem(USERTOKEN, item);
  }

  static getItem() {
    return sessionStorage.getItem(USERTOKEN);
  }

  static removeItem() {
    sessionStorage.removeItem(USERTOKEN);
  }
}

Object.freeze(Storage);
export default Storage;

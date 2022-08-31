class Validation {
  // Check validation form
  // Award
  // award의 title과 description의 길이는 앞 뒤 공백 제거 기준 5글자 이상이어야 한다.
  static validateAwardTitle(title) {
    const checkTitle = title.trim();
    if (checkTitle.length < 5) return false;
    return true;
  }

  static validateAwardDetail(detail) {
    const checkDetail = detail.trim();
    if (checkDetail.length < 5) return false;
    return true;
  }

  // Education
  static validateEducatuinUniversity(university) {
    const checkUniversity = university.trim();
    if (checkUniversity.length < 4) return false;
    return true;
  }

  static validateEducatuinMajor(major) {
    const checkMajor = major.trim();
    if (checkMajor.length < 4) return false;
    return true;
  }

  static validateEducatuinStatus(status) {
    const checkStatus = status.trim();
    if (checkStatus.length < 1) return false;
    return true;
  }

  // User
  // 사용자의 비밀번호는 공백을(" ") 포함하면 안된다.
  // 사용자의 비밀번호의 길이는 5글자 이상이어야 한다.
  // 사용자의 비밀번호는 영문, 숫자 포함 6 ~ 12까지의 길이이다.
  static validateUserEmail(email) {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  static validateUserPassword(password) {
    if (password.includes(' ')) return false;
    if (password.length < 5) return false;
    return password.match(/^[A-Za-z0-9]{6,12}$/);
  }

  static validateUserDescription(description) {
    if (description.length < 1) return false;
    return true;
  }

  // Certificate
  // Certificate의 title, detail은 2글자 이상이어야 한다.
  static validateCertificateTitle(title) {
    const checkTitle = title.trim();
    if (checkTitle.length < 2) return false;
    return true;
  }

  static validateCertificateDetail(detail) {
    const checkDetail = detail.trim();
    if (checkDetail.length < 2) return false;
    return true;
  }

  static validateDateInput(date) {
    const checkDate = date.split('-');
    if (checkDate.length !== 3) return false;
    return true;
  }
}

Object.freeze(Validation);
export default Validation;

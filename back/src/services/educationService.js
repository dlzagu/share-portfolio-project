import { Education } from "../db";

class educationService {
  /**
   * 학력 정보 추가
   * addEducationInfo()
   */
  static async addEducationInfo({ university, major, status, userId }) {
    const education = await Education.create({
      university,
      major,
      status,
      userId,
    });

    return {
      university: education.university,
      major: education.major,
      status: education.status,
      _id: education._id,
    };
  }

  /**
   * 학력 정보 조회
   * getEducationInfo()
   */
  static async getEducationInfo(userId) {
    const educations = await Education.findByUserId(userId);

    // 받아온 데이터가 없을 시 빈 배열 리턴
    if (educations.length < 1) {
      return [];
    }

    return educations;
  }

  /**
   * 학력 정보 수정
   * setEducationInfo()
   */
  static async setEducationInfo({ educationId, toUpdate }) {
    const education = await Education.findByEducationId(educationId);

    // 수정할 대상이 데이터베이스에 없으면 에러 발생
    if (!education) {
      throw new Error("educationId에 대응하는 데이터가 존재하지 않습니다.");
    }

    const { university, major, status } = toUpdate;

    const newValues = {
      ...(university && { university }),
      ...(major && { major }),
      ...(status && { status }),
    };
    return Education.update({ educationId, newValues });
  }

  /**
   * 학력 정보 삭제
   * deleteEducationInfo()
   */
  static async deleteEducationInfo(educationId) {
    const education = await Education.deleteByEducationId(educationId);

    //삭제한 데이터가 없으면 에러 발생
    if (education.deletedCount < 1) {
      throw new Error("존재하지 않는 도큐먼트입니다.");
    }

    return education.deletedCount;
  }
}

export { educationService };

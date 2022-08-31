import { Award } from "../db";

class awardService {
  /**
   * 수상 이력 추가
   * addAwardInfo()
   */
  static async addAwardInfo({ title, detail, userId }) {
    const award = await Award.create({ title, detail, userId });
    return { title: award.title, detail: award.detail, _id: award._id };
  }

  /**
   * 수상 이력 조회
   * getAwardInfo()
   */
  static async getAwardInfo(userId) {
    const awards = await Award.findByUserId(userId);

    // 받아온 데이터가 없을 시 빈 배열 리턴
    if (awards.length < 1) {
      return [];
    }

    return awards;
  }

  /**
   * 수상 이력 수정
   * setAwardInfo()
   */
  static async setAwardInfo({ awardId, toUpdate }) {
    const award = await Award.findByAwardId(awardId);

    // 수정할 대상이 데이터베이스에 없으면 에러 발생
    if (!award) {
      throw new Error("awardId에 대응하는 데이터가 존재하지 않습니다.");
    }

    const { title, detail } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(detail && { detail }),
    };

    return Award.update({ awardId, newValues });
  }

  /**
   * 수상 이력 삭제
   * deleteAwardInfo()
   */
  static async deleteAwardInfo(awardId) {
    const award = await Award.deleteByAwardId(awardId);

    // 삭제한 데이터가 없으면 에러 발생
    if (award.deletedCount < 1) {
      throw new Error("존재하지 않는 도큐먼트입니다.");
    }

    return award.deletedCount;
  }
}

export { awardService };

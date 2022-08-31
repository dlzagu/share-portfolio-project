import { AwardModel } from "../schemas/award";

class Award {
  /**
   * 수상 이력 생성
   * create()
   */
  static async create({ title, detail, userId }) {
    const createdAward = await AwardModel.create({ title, detail, userId });
    return createdAward;
  }

  /**
   * 유저 아이디로 수상 이력 조회
   * findByUserId()
   */
  static async findByUserId(userId) {
    const awardData = await AwardModel.find({ userId })
      .select("_id title detail")
      .lean();

    return awardData;
  }

  /**
   * _id로 수상 이력 조회
   * findByAwardId()
   */
  static async findByAwardId(awardId) {
    const award = await AwardModel.findOne({ _id: awardId }).lean();

    return award;
  }

  /**
   * 수상 이력 업데이트
   * update()
   */
  static async update({ awardId, newValues }) {
    const filter = { _id: awardId };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      newValues,
      option
    )
      .select("_id title detail")
      .lean();

    return updatedAward;
  }

  /**
   * _id로 수상 이력 삭제
   * deleteByAwardId()
   */
  static async deleteByAwardId(awardId) {
    const deletedAward = await AwardModel.deleteOne({ _id: awardId }).lean();

    return deletedAward;
  }
}

export { Award };

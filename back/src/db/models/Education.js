import { EducationModel } from "../schemas/education";

class Education {
  /**
   * 학력 정보 생성
   * create()
   */
  static async create({ university, major, status, userId }) {
    const createdEducation = await EducationModel.create({
      university,
      major,
      status,
      userId,
    });

    return createdEducation;
  }

  /**
   * 유저 아이디로 학력 정보 조회
   * findByUserId()
   */
  static async findByUserId(userId) {
    const educationData = await EducationModel.find({ userId })
      .select("_id university major status")
      .lean();

    return educationData;
  }

  /**
   * _id로 학력 정보 조회
   * findByEducationId()
   */
  static async findByEducationId(educationId) {
    const education = await EducationModel.findOne({ _id: educationId }).lean();
    return education;
  }

  /**
   * 학력 정보 업데이트
   * update()
   */
  static async update({ educationId, newValues }) {
    const filter = { _id: educationId };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      newValues,
      option
    )
      .select("_id university major status")
      .lean();

    return updatedEducation;
  }

  /**
   * _id로 학력 정보 삭제
   * deleteByEducationId()
   */
  static async deleteByEducationId(educationId) {
    const deletedEducation = await EducationModel.deleteOne({
      _id: educationId,
    }).lean();

    return deletedEducation;
  }
}

export { Education };

import { CertificationModel } from "../schemas/certification";

class Certification {
  /**
   * 자격증 정보 생성
   * create()
   */
  static async create({ title, detail, certificationDate, userId }) {
    const createdCertification = await CertificationModel.create({
      title,
      detail,
      certificationDate,
      userId,
    });

    return createdCertification;
  }

  /**
   * 유저 아이디로 자격증 정보 조회
   * findByUserId()
   */
  static async findByUserId(userId) {
    const certificationData = await CertificationModel.find({ userId })
      .select("_id title detail certificationDate")
      .lean();

    return certificationData;
  }

  /**
   * _id로 자격증 정보 조회
   * findByCertificationId()
   */
  static async findByCertificationId(certificationId) {
    const certification = await CertificationModel.findOne({
      _id: certificationId,
    }).lean();

    return certification;
  }

  /**
   * 자격증 정보 업데이트
   * update()
   */
  static async update({ certificationId, newValues }) {
    const filter = { _id: certificationId };
    const option = { returnOriginal: false };

    const updatedCertification = await CertificationModel.findOneAndUpdate(
      filter,
      newValues,
      option
    )
      .select("_id title detail certificationDate")
      .lean();

    return updatedCertification;
  }

  /**
   * 자격증 정보 삭제
   * deleteByCertiicationId()
   */
  static async deleteByCertificationId(certificationId) {
    const deletedCertification = await CertificationModel.deleteOne({
      _id: certificationId,
    }).lean();

    return deletedCertification;
  }
}

export { Certification };

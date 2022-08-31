import { Certification } from "../db";
import dateToString from "../utils/dateObjToString";

class certificationService {
  /**
   * 자격증 정보 추가
   * addCertificationInfo()
   */
  static async addCertificationInfo({
    title,
    detail,
    certificationDate,
    userId,
  }) {
    const certification = await Certification.create({
      title,
      detail,
      certificationDate,
      userId,
    });

    return {
      title: certification.title,
      detail: certification.detail,
      certificationDate: dateToString(certification.certificationDate),
      _id: certification._id,
    };
  }

  /**
   * 자격증 정보 조회
   * getCertificationInfo()
   */
  static async getCertificationInfo(userId) {
    let certifications = await Certification.findByUserId(userId);

    // 받아온 데이터가 없을 시 빈 배열 리턴
    if (certifications.length < 1) {
      return [];
    }

    // 자격증 취득 날짜를 String으로 변환
    certifications = certifications.map((certification) => {
      certification.certificationDate = dateToString(
        certification.certificationDate
      );

      return certification;
    });

    return certifications;
  }

  /**
   * 자격증 정보 수정
   * setCertificationInfo()
   */
  static async setCertificationInfo({ certificationId, toUpdate }) {
    const hasCertification = await Certification.findByCertificationId(
      certificationId
    );

    // 수정할 대상이 데이터베이스에 없으면 에러 발생
    if (!hasCertification) {
      throw new Error("certificationId에 대응하는 데이터가 존재하지 않습니다.");
    }

    const { title, detail, certificationDate } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(detail && { detail }),
      ...(certificationDate && { certificationDate }),
    };

    const certification = await Certification.update({
      certificationId,
      newValues,
    });

    // 자격증 취득 날짜를 String으로 변환
    certification.certificationDate = dateToString(
      certification.certificationDate
    );

    return certification;
  }

  /**
   * 자격증 정보 삭제
   * deleteCertificationInfo()
   */
  static async deleteCertificationInfo(certificationId) {
    const certification = await Certification.deleteByCertificationId(
      certificationId
    );

    // 삭제한 데이터가 없으면 에러 발생
    if (certification.deletedCount < 1) {
      throw new Error("존재하지 않는 도큐먼트입니다.");
    }
    
    return certification.deletedCount;
  }
}

export { certificationService };

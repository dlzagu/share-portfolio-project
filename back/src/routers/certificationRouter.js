import { Router } from 'express';
import { certificationService } from '../services/certificationService';
import { login_required } from '../middlewares/login_required';

const certificationRouter = Router();

/**
 * 자격증 정보 추가 라우터
 */
certificationRouter.post('/', login_required, async (req, res, next) => {
  try {
    const data = {
      title: req.body.title,
      detail: req.body.detail,
      certificationDate: req.body.certificationDate,
      userId: req.currentUserId,
    };

    const registeredCertification =
      await certificationService.addCertificationInfo(data);

    res.status(201).send({
      success: true,
      message: '데이터 등록 성공',
      apiPath: '[POST] /api/certification',
      data: registeredCertification,
    });

  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: '[POST] /api/certification',
    });
  }
});

/**
 * 자격증 정보 조회 라우터
 */
certificationRouter.get('/', login_required, async (req, res, next) => {
  try {
    const userId = req.query.userId ?? req.currentUserId;

    const certification = await certificationService.getCertificationInfo(
      userId
    );

    res.status(200).send({
      success: true,
      message: '데이터 불러오기 성공',
      apiPath: '[GET] /api/certification',
      data: certification,
    });

  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: '[GET] /api/certification',
    });
  }
});

/**
 * 자격증 정보 수정 라우터
 */
certificationRouter.put(
  '/:certificationId',
  login_required,
  async (req, res, next) => {
    try {
      const certificationId = req.params.certificationId;
      const title = req.body.title ?? null;
      const detail = req.body.detail ?? null;
      const certificationDate = req.body.certificationDate ?? null;

      const toUpdate = { title, detail, certificationDate };

      const modifiedCertification =
        await certificationService.setCertificationInfo({
          certificationId,
          toUpdate,
        });

      res.status(201).send({
        success: true,
        message: '데이터 수정 성공',
        apiPath: '[PUT] /api/certification/:certificationId',
        data: modifiedCertification,
      });

    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
        apiPath: '[PUT] /api/certification/:certificationId',
      });
    }
  }
);

/**
 * 자격증 정보 삭제 라우터
 */
certificationRouter.delete(
  '/:certificationId',
  login_required,
  async (req, res, next) => {
    try {
      const { certificationId } = req.params;

      const deletedCount = await certificationService.deleteCertificationInfo(
        certificationId
      );

      res.status(200).send({
        success: true,
        message: '데이터 삭제 성공',
        apiPath: '[DELETE] /api/certification/:certificationId',
        data: {
          deletedCount,
        },
      });

    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
        apiPath: '[DELETE] /api/certification/:certificationId',
      });
    }
  }
);

export { certificationRouter };

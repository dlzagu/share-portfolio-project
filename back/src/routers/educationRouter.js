import { Router } from "express";
import { educationService } from "../services/educationService";
import { login_required } from "../middlewares/login_required";

const educationRouter = Router();

/**
 * 학력 정보 추가 라우터
 */
educationRouter.post("/", login_required, async (req, res, next) => {
  try {
    const data = {
      university: req.body.university,
      major: req.body.major,
      status: req.body.status,
      userId: req.currentUserId,
    };

    const registeredEducation = await educationService.addEducationInfo(data);

    res.status(201).send({
      success: true,
      message: "데이터 등록 성공",
      apiPath: "[POST] /api/education",
      data: registeredEducation,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[POST] /api/education",
    });
  }
});

/**
 * 학력 정보 조회 라우터
 */
educationRouter.get("/", login_required, async (req, res, next) => {
  try {
    const userId = req.query.userId ?? req.currentUserId;

    const education = await educationService.getEducationInfo(userId);

    res.status(200).send({
      success: true,
      message: "데이터 불러오기 성공",
      apiPath: "[GET] /api/education",
      data: education,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[GET] /api/education",
    });
  }
});

/**
 * 학력 정보 수정 라우터
 */
educationRouter.put("/:educationId", login_required, async (req, res, next) => {
  try {
    const educationId = req.params.educationId;
    const university = req.body.university ?? null;
    const major = req.body.major ?? null;
    const status = req.body.status ?? null;

    const toUpdate = { university, major, status };

    const modifiedEducation = await educationService.setEducationInfo({
      educationId,
      toUpdate,
    });

    res.status(201).send({
      success: true,
      message: "데이터 수정 성공",
      apiPath: "[PUT] /api/education/:educationId",
      data: modifiedEducation,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[PUT] /api/education/:educationId",
    });
  }
});

/**
 * 학력 정보 삭제 라우터
 */
educationRouter.delete(
  "/:educationId",
  login_required,
  async (req, res, next) => {
    try {
      const { educationId } = req.params;
      const deletedCount = await educationService.deleteEducationInfo(
        educationId
      );

      res.status(200).send({
        success: true,
        message: "데이터 삭제 성공",
        apiPath: "[DELETE] /api/education/:educationId",
        data: {
          deletedCount,
        },
      });
    } catch (err) {
      res.status(404).send({
        success: false,
        message: err.message,
        apiPath: "[DELETE] /api/education/:educationId",
      });
    }
  }
);

export { educationRouter };

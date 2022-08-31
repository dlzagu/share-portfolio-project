import { Router } from "express";
import { awardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";

const awardRouter = Router();

/**
 * 수싱 이력 추가 라우터
 */
awardRouter.post("/", login_required, async (req, res, next) => {
  try {
    const data = {
      title: req.body.title,
      detail: req.body.detail,
      userId: req.currentUserId,
    };

    const registeredAward = await awardService.addAwardInfo(data);

    res.status(201).send({
      success: true,
      message: "데이터 등록 성공",
      apiPath: "[POST] /api/award",
      data: registeredAward,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[POST] /api/award",
    });
  }
});

/**
 * 수상 이력 조회 라우터
 */
awardRouter.get("/", login_required, async (req, res, next) => {
  try {
    const userId = req.query.userId ?? req.currentUserId;

    const award = await awardService.getAwardInfo(userId);

    res.status(200).send({
      success: true,
      message: "데이터 불러오기 성공",
      apiPath: "[GET] /api/award",
      data: award,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[GET] /api/award",
    });
  }
});

/**
 * 수상 이력 수정 라우터
 */
awardRouter.put("/:awardId", login_required, async (req, res, next) => {
  try {
    const awardId = req.params.awardId;
    const title = req.body.title ?? null;
    const detail = req.body.detail ?? null;

    const toUpdate = { title, detail };

    const modifiedAward = await awardService.setAwardInfo({
      awardId,
      toUpdate,
    });

    res.status(201).send({
      success: true,
      message: "데이터 수정 성공",
      apiPath: "[PUT] /api/award/:awardId",
      data: modifiedAward,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[PUT] /api/award/:awardId",
    });
  }
});

/**
 * 수상 이력 삭제 라우터
 */
awardRouter.delete("/:awardId", login_required, async (req, res, next) => {
  try {
    const { awardId } = req.params;

    const deletedCount = await awardService.deleteAwardInfo(awardId);

    res.status(200).send({
      success: true,
      message: "데이터 삭제 성공",
      apiPath: "[DELETE] /api/award/:awardId",
      data: {
        deletedCount,
      },
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[DELETE] /api/award/:awardId",
    });
  }
});

export { awardRouter };

import { Router } from "express";
import { projectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";

const projectRouter = Router();

/**
 * 프로젝트 정보 추가 라우터
 */
projectRouter.post("/", login_required, async (req, res, next) => {
  try {
    const data = {
      title: req.body.title,
      detail: req.body.detail,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      userId: req.currentUserId,
    };

    const registeredProject = await projectService.addProjectInfo(data);

    res.status(201).send({
      success: true,
      message: "데이터 등록 성공",
      apiPath: "[POST] /api/project",
      data: registeredProject,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[POST] /api/project",
    });
  }
});

/**
 * 프로젝트 정보 조회 라우터
 */
projectRouter.get("/", login_required, async (req, res, next) => {
  try {
    const userId = req.query.userId ?? req.currentUserId;

    const project = await projectService.getProjectInfo(userId);

    res.status(200).send({
      success: true,
      message: "데이터 불러오기 성공",
      apiPath: "[GET] /api/project",
      data: project,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[GET] /api/project",
    });
  }
});

/**
 * 프로젝트 정보 수정 라우터
 */
projectRouter.put("/:projectId", login_required, async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const title = req.body.title ?? null;
    const detail = req.body.detail ?? null;
    const startDate = req.body.startDate ?? null;
    const endDate = req.body.endDate ?? null;

    const toUpdate = { title, detail, startDate, endDate };
    
    const modifiedProject = await projectService.setProjectInfo({
      projectId,
      toUpdate,
    });

    res.status(201).send({
      success: true,
      message: "데이터 수정 성공",
      apiPath: "[PUT] /api/project/:projectId",
      data: modifiedProject,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[PUT] /api/project/:projectId",
    });
  }
});

/**
 * 프로젝트 정보 삭제 라우터
 */
projectRouter.delete("/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const deletedCount = await projectService.deleteProjectInfo(projectId);

    res.status(200).send({
      success: true,
      message: "데이터 삭제 성공",
      apiPath: "[DELETE] /api/project/:projectId",
      data: {
        deletedCount,
      },
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: err.message,
      apiPath: "[DELETE] /api/project/:projectId",
    });
  }
});

export { projectRouter };

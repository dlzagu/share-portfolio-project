import { Project } from "../db";
import dateToString from "../utils/dateObjToString";

class projectService {
  /**
   * 프로젝트 정보 추가
   * addProjectInfo()
   */
  static async addProjectInfo({ title, detail, startDate, endDate, userId }) {
    const project = await Project.create({
      title,
      detail,
      startDate,
      endDate,
      userId,
    });

    return {
      title: project.title,
      detail: project.detail,
      startDate: dateToString(project.startDate),
      endDate: dateToString(project.endDate),
      _id: project._id,
    };
  }

  /**
   * 프로젝트 정보 조회
   * getProjectInfo()
   */
  static async getProjectInfo(userId) {
    let projects = await Project.findByUserId(userId);

    // 받아온 데이터가 없을 시 빈 배열 리턴
    if (projects.length < 1) {
      return [];
    }

    // 프로젝트 시작, 종료 날짜를 String으로 변환
    projects = projects.map((project) => {
      project.startDate = dateToString(project.startDate);
      project.endDate = dateToString(project.endDate);

      return project;
    });

    return projects;
  }

  /**
   * 프로젝트 정보 수정
   * setProjectInfo()
   */
  static async setProjectInfo({ projectId, toUpdate }) {
    const hasProject = await Project.findByProjectId(projectId);

    //수정할 대상이 데이터베이스에 없으면 에러 발생
    if (!hasProject) {
      throw new Error("projectId에 대응하는 데이터가 존재하지 않습니다.");
    }

    const { title, detail, startDate, endDate } = toUpdate;

    const newValues = {
      ...(title && { title }),
      ...(detail && { detail }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    const project = await Project.update({ projectId, newValues });

    // 프로젝트 시작, 종료 날짜를 String으로 변환
    project.startDate = dateToString(project.startDate);
    project.endDate = dateToString(project.endDate);

    return project;
  }

  /**
   * 프로젝트 정보 삭제
   * deleteProjectInfo()
   */
  static async deleteProjectInfo(projectId) {
    const project = await Project.deleteByProjectId(projectId);

    // 삭제한 데이터가 없으면 에러 발생
    if (project.deletedCount < 1) {
      throw new Error("존재하지 않는 도큐먼트입니다.");
    }

    return project.deletedCount;
  }
}

export { projectService };

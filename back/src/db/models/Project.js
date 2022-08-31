import { ProjectModel } from "../schemas/project";

class Project {
  /**
   * 프로젝트 정보 생성
   * create()
   */
  static async create({ title, detail, startDate, endDate, userId }) {
    const createdProject = await ProjectModel.create({
      title,
      detail,
      startDate,
      endDate,
      userId,
    });

    return createdProject;
  }

  /**
   * 유저 아이디로 프로젝트 정보 조회
   * findByUserId()
   */
  static async findByUserId(userId) {
    const projectData = await ProjectModel.find({ userId })
      .select("_id title detail startDate endDate")
      .lean();

    return projectData;
  }

  /**
   * _id로 프로젝트 정보 조회
   * findByProjectId()
   */
  static async findByProjectId(projectId) {
    const project = await ProjectModel.findOne({
      _id: projectId,
    }).lean();

    return project;
  }

  /**
   * 프로젝트 정보 업데이트
   * update()
   */
  static async update({ projectId, newValues }) {
    const filter = { _id: projectId };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      newValues,
      option
    )
      .select("_id title detail startDate endDate")
      .lean();

    return updatedProject;
  }

  /**
   * 프로젝트 정보 삭제
   * deleteByProjectId()
   */
  static async deleteByProjectId(projectId) {
    const deletedProject = await ProjectModel.deleteOne({
      _id: projectId,
    }).lean();

    return deletedProject;
  }
}

export { Project };

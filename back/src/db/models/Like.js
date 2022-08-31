import { LikeModel } from "../schemas/like";

class Like {
  /*
   * create()
   * 좋아요 버튼을 클릭한 user와 좋아요를 받은 user로 like 객체 생성
   */
  static async create({ currentUser, ownerUser }) {
    const createdNewLike = await LikeModel.create({
      currentUser,
      ownerUser,
    });
    return createdNewLike;
  }

  /*
   * findByUser()
   * 좋아요 버튼을 클릭한 user와 좋아요를 받은 user의 like 객체가 LikeModel안에 있다면 like 객체 반환/ 아니면 null 반환
   */
  static async findByUser({ currentUser, ownerUser }) {
    const like = await LikeModel.findOne({
      $and: [{ currentUser }, { ownerUser }],
    });
    return like;
  }

  /*
   * deleteById
   * 좋아요 버튼을 클릭한 user와 좋아요를 받은 user의 like 객체 삭제
   */
  static async deleteById({ isLiked }) {
    const deleteResult = await LikeModel.deleteOne({
      _id: isLiked._id,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Like };

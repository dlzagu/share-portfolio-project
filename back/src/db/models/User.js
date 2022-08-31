import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll(query) {
    const users = await UserModel.find(query);
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedUser;
  }

  /*
   * updateUserLike()
   * 유저의 좋아요 수와 status 갱신하기 위한 함수
   */
  static async updateUserLike({ user_id, fieldToUpdate, value }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: value };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedUser;
  }
  /*
   * addLikeList()
   * 좋아요를 누른 사람의 이름 추가
   */
  static async addLikeList({ user_id, value }) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { id: user_id },
      {
        $push: { liked: { name: value } },
      }
    );
    return updatedUser;
  }

  /*
  deleteLikeList()
  좋아요를 누른 사람의 이름 삭제
  */
  static async deleteLikeList({ user_id, value }) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { id: user_id },
      {
        $pull: { liked: { name: value } },
      }
    );
    return updatedUser;
  }
}

export { User };

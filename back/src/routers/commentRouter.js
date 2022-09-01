import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CommentService } from "../services/commentService";
import { userAuthService } from "../services/userService";
const commentRouter = Router();

//생성
commentRouter.post("/:id", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    console.log("hello");

    const comment = req.body.comment;
    const ownerUserId = req.body.ownerUserId;
    const writerUserId = req.params.id;

    const newComment = await CommentService.addComment({
      ownerUserId,
      writerUserId,
      comment,
    });
    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
});

//특정유저의 전체 댓글 조회
commentRouter.get("/list/:id", login_required, async (req, res, next) => {
  try {
    const ownerUserId = req.params.id;

    console.log("hi", ownerUserId);
    const commentlist = await CommentService.getComments({
      ownerUserId,
    });

    if (commentlist.errorMessage) {
      throw new Error(commentlist.errorMessage);
    }

    res.status(200).send(commentlist);
  } catch (error) {
    next(error);
  }
});

export { commentRouter };

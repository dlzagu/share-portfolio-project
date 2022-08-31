import multer from 'multer';
import path from 'path';

function getMulter(storePath, fileSizeWeight) {
  /**
   * multer 설정
   */
  const storage = multer.diskStorage({
    destination: function (req, file, done) {
      // 저장 공간 설정
      done(null, storePath);
    },
    filename(req, file, done) {
      // 저장될 파일 이름 설정
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 최종 파일 이름(날짜로 덮어씌우지 못하게)
    },
  });

  const limits = {
    //최대 용량 10MB (초과하면 404 에러)
    fileSize: fileSizeWeight * 1024 * 1024, // x * kilo * mega
  };

  return multer({ storage, limits });
}

export default getMulter;
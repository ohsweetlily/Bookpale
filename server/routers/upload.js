//사진 업로드 파일
import multer from 'multer';
import path from 'path';
import fs from 'fs';

try{
  fs.readdirSync('uploads');
}catch(err){
  console.error('uploads폴더가 없습니다. 폴더를 생성합니다');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage:multer.diskStorage({
    destination(req,file,done){
      done(null,'uploads/');
    },
    filename(req,file,done){
      //file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      //한글파일명 깨질시에 주석해제
      const ext = path.extname(file.originalname);
      done(null,path.basename(file.originalname,ext)+Date.now()+ext);
    }
  }),
  limits:{fileSize: 5* 1024 *1024 }
});

export default upload;
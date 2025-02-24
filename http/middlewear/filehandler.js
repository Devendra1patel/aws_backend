const multer = require("multer");
const path = require("path");
const filehandler = () => {
    return {
        uploadFileDisk : multer({ storage: multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './assets/pics')
            },
            filename: function (req, file, cb)  
            {
              console.log("------file-milter-->",file);
              // const extention = file.originalname.split('.')[1];
              const extention = path.extname(file.originalname);
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10)
              cb(null, file.fieldname + '-' + uniqueSuffix + extention);
              // const folderPath = path.join(__dirname, './assets/pics');
              // const folderPath = path.join(path.dirnam(path.dirname(__dirname)), './assets/pics');
              // req.body.file = folderPath + '\\' + file.fieldname + '-' + uniqueSuffix + '.' +  extention;
              const folderPath = `${process.env.LOCKAL_HOST_BASE_URL}/files/v1/development/getfilesfromdisk/`;
              req.body.file = folderPath + file.fieldname + '-' + uniqueSuffix +  extention;
              console.log('--->multer-',req.body.file); 
            }  
          }) 
        })
    }
}
module.exports = filehandler
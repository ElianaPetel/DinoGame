const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-bezkoder-${file.originalname}`,
    };
  },
});

const uploadFile = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 16 * 1024 * 1024 }, // Limit filesize to 16MB
});

function uploadMiddleware(fieldName) {
  return function(req, res, next) {
    uploadFile.single(fieldName)(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(400).json({ error: err.message });
      }

      // Everything went fine, proceed with the next middleware function
      next();
    });
  };
};

module.exports = { uploadFile, uploadMiddleware };


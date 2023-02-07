
const router = require("express").Router();
const multer =require('multer');
const candidatesController = require('./candidates.controller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/v1/public/candidateResume')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`) //Appending extension
    }
  })
var upload = multer({ storage: storage });

class candidatesRoutes {

    constructor() {

        this.router = router;

        this.core();
    }


    core() {

        /** Routes */
        this.router.post("/", upload.single('resume'), candidatesController.addCandidates);
        this.router.get("/search",  candidatesController.getSearchCandidates);
        this.router.get("/",  candidatesController.getCandidates);
        this.router.get("/:id",  candidatesController.getCandidateById);

    }

    getRouters() {
        return this.router;
    }
}


module.exports = candidatesRoutes;
/** Auth Routes */

/** Imports */
const router = require("express").Router();
const authController = require('./auth.controller');

class authRoutes {

    constructor() {

        /** router */
        this.router = router;

        /** Initialize Routes */
        this.core();
    }

    /**
     * Initialize Routes
     */
    core() {

        /** Routes */
        this.router.get("/",  authController.login);
  

    }

    getRouters() {
        return this.router;
    }
}


/** Exports */
module.exports = authRoutes;
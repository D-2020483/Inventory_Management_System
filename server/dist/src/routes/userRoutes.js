"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/signup", userController_1.signUp);
router.post("/signin", userController_1.signIn);
router.get("/", userController_1.getUsers);
exports.default = router;

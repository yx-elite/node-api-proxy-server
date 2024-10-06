import express from "express";

import { proxyStatus } from "../controller/status.controller.js";
import { defaultRoute, statusRoute } from "../constants.js";


const router = express.Router();

router.get(defaultRoute, proxyStatus);    // 'api/'
router.get(statusRoute, proxyStatus);     // 'api/status'

export default router;
import express from "express";


import { proxyTest, chatCompletions } from "../controller/proxy.Controller.js";
import { proxyTestRoute, chatCompletionsRoute } from "../constants/constants.js";

const router = express.Router();

router.get(proxyTestRoute, proxyTest);                // 'api/
router.post(chatCompletionsRoute, chatCompletions)    // 'api/v1/chat/completions'

export default router;
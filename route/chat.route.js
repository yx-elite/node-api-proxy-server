import express from 'express'

import { chatCompletionsRoute, completionsRoute } from "../constants.js";
import { chatCompletions } from "../controller/chat.controller.js";


const router = express.Router()

router.post(chatCompletionsRoute, chatCompletions)    // 'api/v1/chat/completions'
router.post(completionsRoute, chatCompletions)        // 'api/v1/completions'

export default router;
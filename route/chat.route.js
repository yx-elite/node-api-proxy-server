import express from 'express'

import { chatCompletionsRoute, completionsRoute } from "../constants.js";
import { completions, chatCompletions } from "../controller/chat.controller.js";


const router = express.Router()

router.post(completionsRoute, completions)            // 'api/v1/completions'
router.post(chatCompletionsRoute, chatCompletions)    // 'api/v1/chat/completions'

export default router;
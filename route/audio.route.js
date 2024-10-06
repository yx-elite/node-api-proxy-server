import express from 'express'

import { audioSpeechRoute, audioTranscriptionsRoute, audioTranslationsRoute } from "../constants.js";
import { audioSpeech, audioTranscriptions, audioTranslations } from "../controller/audio.controller.js";


const router = express.Router()

router.post(audioTranslationsRoute, audioTranslations);        // 'api/v1/audio/translations'
router.post(audioTranscriptionsRoute, audioTranscriptions);    // 'api/v1/audio/transcriptions'
router.post(audioSpeechRoute, audioSpeech);                    // 'api/v1/audio/speech'

export default router;
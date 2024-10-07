import express from 'express'

import upload from '../middleware/upload.js';
import { audioSpeechRoute, audioTranscriptionsRoute, audioTranslationsRoute } from "../constants.js";
import { audioSpeech, audioTranscriptions, audioTranslations } from "../controller/audio.controller.js";


const router = express.Router()

router.post(audioTranscriptionsRoute, upload.any(), audioTranscriptions);    // 'api/v1/audio/transcriptions'
router.post(audioTranslationsRoute, upload.any(), audioTranslations);        // 'api/v1/audio/translations'
router.post(audioSpeechRoute, audioSpeech);                                  // 'api/v1/audio/speech'

export default router;
import { formDataRequest, ttsRequest } from "./request.js";
import { audioSpeechRoute, audioTranscriptionsRoute, audioTranslationsRoute } from "../constants.js";


export const audioTranscriptions = async (req, res) => formDataRequest(req, res, audioTranscriptionsRoute);

export const audioTranslations = async (req, res) => formDataRequest(req, res, audioTranslationsRoute);

export const audioSpeech = async (req, res) => ttsRequest(req, res, audioSpeechRoute);

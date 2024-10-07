import { nonStreamRequest, formDataRequest } from "./request.js";
import { audioSpeechRoute, audioTranscriptionsRoute, audioTranslationsRoute } from "../constants.js";


export const audioTranscriptions = async (req, res) => formDataRequest(req, res, audioTranscriptionsRoute);

export const audioTranslations = async (req, res) => formDataRequest(req, res, audioTranslationsRoute);

export const audioSpeech = async (req, res) => nonStreamRequest(req, res, audioSpeechRoute);

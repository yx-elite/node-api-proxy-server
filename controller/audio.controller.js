import { sttRequest, ttsRequest } from "./request.js";
import { audioSpeechRoute, audioTranscriptionsRoute, audioTranslationsRoute } from "../constants.js";


export const audioTranscriptions = async (req, res) => sttRequest(req, res, audioTranscriptionsRoute);

export const audioTranslations = async (req, res) => sttRequest(req, res, audioTranslationsRoute);

export const audioSpeech = async (req, res) => ttsRequest(req, res, audioSpeechRoute);

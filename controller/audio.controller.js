import { nonStreamRequest } from "./request.js";
import { audioSpeechRoute, audioTranscriptionsRoute, audioTranslationsRoute } from "../constants.js";


export const audioTranscriptions = async (req, res) => nonStreamRequest(req, res, audioTranscriptionsRoute);

export const audioTranslations = async (req, res) => nonStreamRequest(req, res, audioTranslationsRoute);

export const audioSpeech = async (req, res) => nonStreamRequest(req, res, audioSpeechRoute);

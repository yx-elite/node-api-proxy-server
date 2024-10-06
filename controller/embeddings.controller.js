import { nonStreamRequest } from "./request.js";
import { embeddingsRoute } from "../constants.js";

export const embeddings = async (req, res) => nonStreamRequest(req, res, embeddingsRoute)
import { completionsRoute, chatCompletionsRoute } from "../constants.js";
import { nonStreamRequest, streamRequest } from "./request.js";


export const completions = async (req, res) => {
  return req.body.stream
    ? streamRequest(req, res, completionsRoute)
    : nonStreamRequest(req, res, completionsRoute);
};

export const chatCompletions = async (req, res) => {
  return req.body.stream
    ? streamRequest(req, res, chatCompletionsRoute)
    : nonStreamRequest(req, res, chatCompletionsRoute);
};

import { imageGenerationsRoute, sdGenerationsRoute, fluxGenerationsRoute } from "../constants.js";
import { nonStreamRequest } from "./request.js";


export const imageGenerations = async (req, res) => nonStreamRequest(req, res, imageGenerationsRoute);

export const sdGenerations = async (req, res) => nonStreamRequest(req, res, sdGenerationsRoute);

export const fluxGenerations = async (req, res) => nonStreamRequest(req, res, fluxGenerationsRoute)
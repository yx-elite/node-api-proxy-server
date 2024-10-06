import express from "express";

import {imageGenerationsRoute, sdGenerationsRoute, fluxGenerationsRoute } from "../constants.js";
import {fluxGenerations, imageGenerations, sdGenerations} from "../controller/images.controller.js";


const router = express.Router();

router.post(imageGenerationsRoute, imageGenerations);    // 'api/v1/images/generations' (Dall-e)
router.post(sdGenerationsRoute, sdGenerations);          // 'api/v1/chat/completions' (Stable Diffusion)
router.post(fluxGenerationsRoute, fluxGenerations);      // 'api/v1/chat/completions' (Flux)

export default router
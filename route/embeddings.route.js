import express from "express";

import { embeddingsRoute } from "../constants.js";
import { embeddings } from "../controller/embeddings.controller.js";


const router = express.Router();

router.post(embeddingsRoute, embeddings);    // 'api/v1/embeddings'

export default router
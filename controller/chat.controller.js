import needle from "needle";

import { chatCompletionsRoute } from "../constants.js";


export const chatCompletions = async (req, res) => {
  const targetUrl = process.env.API_BASE_URL + chatCompletionsRoute;
  const headers = {...req.headers};

  if (process.env.NODE_ENV === "development") {
    console.log(`Forwarding request to: ${targetUrl}`)
    delete headers.host;
  }

  const options = {headers: headers}

  try {
    let isStreaming = false;

    if (req.body.stream) {
      // Handle streaming response
      const needleRes = await needle.request(req.method, targetUrl, req.body, options);

      // Add event listener to check streaming response
      needleRes.on('header', (statusCode, responseHeaders) => {
        if (process.env.NODE_ENV==="development") {
          console.log(`Streaming response...`)
        }
        isStreaming = true;
        res.writeHead(statusCode, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });
      });

      // Add event listener to handle chunks streaming
      needleRes.on('data', (chunk) => res.write(chunk));

      // Add event listener to finalize the response
      needleRes.on('end', () => res.end());

      // Handle errors on streaming
      needleRes.on('error', (error) => {
        console.error('Request Error:', error);
        res.status(500).json({ "success": false, "error": "Error making request" });
      });
    } else {
      // Handle non-streaming response
      const needleRes = await needle(req.method, targetUrl, req.body, options);
      return res.status(needleRes.statusCode).json(needleRes.body);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ "success": false, "error": "Internal server error" });
  }
}
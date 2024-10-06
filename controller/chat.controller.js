import needle from "needle";

import { chatCompletionsRoute } from "../constants.js";


export const chatCompletions = async (req, res) => {
  const targetUrl = process.env.API_BASE_URL + chatCompletionsRoute;
  const headers = {...req.headers};
  delete headers.host;

  if (process.env.NODE_ENV === "development") {
    console.log(`Forwarding request to: ${targetUrl}`)
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
          'Content-Type': responseHeaders['content-type'] || 'text/event-stream',
          'Cache-Control': responseHeaders['cache-control'] || 'no-cache',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': responseHeaders['access-control-allow-credentials'] || true,
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
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

      res.writeHead(needleRes.statusCode, {
        'Content-Type': needleRes.headers['content-type'] || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': needleRes.headers['access-control-allow-credentials'] || true,
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
      });

      res.end(JSON.stringify(needleRes.body));
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ "success": false, "error": "Internal server error" });
  }
}
import needle from "needle";


export const nonStreamRequest = async (req, res, requestRoute) => {
  const targetUrl = process.env.API_BASE_URL + requestRoute;
  const headers = {...req.headers};
  delete headers.host;

  if (process.env.NODE_ENV === "development") {
    console.log(`Forwarding nonStreamRequest to: ${targetUrl}`)
  }

  const options = {headers: headers}

  try {
    const needleRes = await needle(req.method, targetUrl, req.body, options);

    res.writeHead(needleRes.statusCode, {
      'Content-Type': needleRes.headers['content-type'] || 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': needleRes.headers['access-control-allow-credentials'] || true,
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    });

    res.end(JSON.stringify(needleRes.body));

  } catch (e) {
    console.error("Error in nonStreamRequest:", e);
    return res.status(500).json({ "success": false, "error": "Internal server error", "details": e.message });
  }
}

export const streamRequest = async (req, res, requestRoute) => {
  const targetUrl = process.env.API_BASE_URL + requestRoute;
  const headers = {...req.headers};
  delete headers.host;

  if (process.env.NODE_ENV === "development") {
    console.log(`Forwarding streamRequest to: ${targetUrl}`)
  }

  const options = {headers: headers}

  try {
    let isStreaming = false;

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
      console.error('Error in streamRequest:', error);
      res.status(500).json({ "success": false, "error": "Error making request" });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ "success": false, "error": "Internal server error", "details": e.message });
  }
}

export const sttRequest = async (req, res, requestRoute) => {
  const targetUrl = process.env.API_BASE_URL + requestRoute;
  const headers = {...req.headers};
  delete headers.host;

  try {
    const formData = {};

    for (const [key, value] of Object.entries(req.body)) {
      formData[key] = value;
    }

    if (req.files && req.files.length > 0) {
      const file = req.files[0];
      formData.file = {
        buffer: file.buffer,
        filename: file.originalname,
        content_type: file.mimetype
      };
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`Forwarding sttRequest to: ${targetUrl}`);
      console.log('Request body:', formData);
    }

    const options = {
      multipart: true,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      }
    };

    const needleRes = await needle('post', targetUrl, formData, options);

    res.writeHead(needleRes.statusCode, {
      'Content-Type': needleRes.headers['content-type'] || 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': needleRes.headers['access-control-allow-credentials'] || true,
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    });

    res.end(JSON.stringify(needleRes.body));

  } catch (e) {
    console.error('Error in sttRequest:', e);
    return res.status(500).json({ "success": false, "error": "Internal server error", "details": e.message });
  }
}

export const ttsRequest = async (req, res, requestRoute) => {
  const targetUrl = process.env.API_BASE_URL + requestRoute;
  const headers = {...req.headers};
  delete headers.host;

  if (process.env.NODE_ENV === "development") {
    console.log(`Forwarding ttsRequest to: ${targetUrl}`);
    console.log('Request body:', req.body);
  }

  try {
    const options = {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      response_type: 'buffer'  // This is important for handling binary data
    };

    const needleRes = await needle('post', targetUrl, req.body, options);

    res.writeHead(needleRes.statusCode, {
      'Content-Type': needleRes.headers['content-type'] || 'audio/mpeg',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': needleRes.headers['access-control-allow-credentials'] || true,
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    });

    // Send the audio buffer
    res.end(needleRes.body);

  } catch (e) {
    console.error('Error in ttsRequest:', e);
    return res.status(500).json({ "success": false, "error": "Internal server error", "details": e.message });
  }
}
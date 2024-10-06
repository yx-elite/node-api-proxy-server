import needle from "needle";


export const nonStreamRequest = async (req, res, nonStreamRequestRoute) => {
  const targetUrl = process.env.API_BASE_URL + nonStreamRequestRoute;
  const headers = {...req.headers};
  delete headers.host;

  if (process.env.NODE_ENV === "development") {
    console.log(`Forwarding request to: ${targetUrl}`)
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
    console.error(e);
    return res.status(500).json({ "success": false, "error": "Internal server error" });
  }
}

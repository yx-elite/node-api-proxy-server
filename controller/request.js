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
    console.log(headers)
    const needleRes = await needle(req.method, targetUrl, req.body, options);
    return res.status(needleRes.statusCode).json(needleRes.body);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ "success": false, "error": "Internal server error" });
  }
}

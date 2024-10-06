import needle from "needle";


export const proxyStatus = async (req, res) => {
  if (process.env.NODE_ENV==="development") {
    console.log(`Forwarding request to: ${process.env.API_BASE_URL}`);
  }

  try {
    const needleRes = await needle(req.method, process.env.API_BASE_URL);
    needleRes.statusCode === 200 ? (
      res.status(needleRes.statusCode).json({
        "success": true,
        "message": [{
          "status": "Active",
          "detail": "Connected successfully"
        }]
      })
    ) : (
      res.status(needleRes.statusCode).json({
        "success": false,
        "message": [{
          "status": "Inactive",
          "detail": "Failed to connect. Your region is not supported"
        }]
      })
    )
  } catch (e) {
    console.error(e)
    res.status(500).json({ "success": false, "message": "Internal server error" })
  }
}

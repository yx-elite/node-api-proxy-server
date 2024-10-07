import axios from "axios";


export const proxyStatus = async (req, res) => {
  if (process.env.NODE_ENV==="development") {
    console.log(`Forwarding request to: ${process.env.API_BASE_URL}`);
  }

  try {
    const axiosRes = await axios({
      method: req.method,
      url: process.env.API_BASE_URL
    });

    axiosRes.status === 200 ? (
      res.status(axiosRes.status).json({
        "success": true,
        "message": [{
          "status": "Active",
          "detail": "Connected successfully"
        }]
      })
    ) : (
      res.status(axiosRes.status).json({
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

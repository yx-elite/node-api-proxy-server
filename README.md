# Node API Proxy Server

This project is a Node.js-based API proxy server designed to hide private API URLs and provide a secure interface for various AI-related services.

## Features

- Proxy requests to a private API
- Support for various AI services:
  - Chat completions
  - Image generation (DALL-E, Stable Diffusion, Flux)
  - Embeddings
  - Audio transcription and translation
  - Text-to-speech
- CORS support
- Request logging
- File upload handling
- Streaming support for applicable endpoints

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/node-api-proxy-server.git
   cd node-api-proxy-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```bash
   PORT=5000
   API_BASE_URL=https://your-private-api-url.com
   NODE_ENV=development
   ```

## Usage

To start the server in development mode:
```
npm run dev
```

To start the server in production mode:
```
npm start
```

The server will start on the port specified in your `.env` file (default is 5000).

## API Endpoints

- `/` and `/api/status`: Check API status
- `/api/v1/chat/completions`: Chat completions
- `/api/v1/completions`: Text completions
- `/api/v1/images/generations`: DALL-E image generation
- `/api/v1/sd/generations`: Stable Diffusion image generation
- `/api/v1/flux/generations`: Flux image generation
- `/api/v1/embeddings`: Generate embeddings
- `/api/v1/audio/transcriptions`: Audio transcription
- `/api/v1/audio/translations`: Audio translation
- `/api/v1/audio/speech`: Text-to-speech

## Project Structure

```
.
├── controller/
│   ├── audio.controller.js
│   ├── chat.controller.js
│   ├── embeddings.controller.js
│   ├── images.controller.js
│   ├── request.js
│   └── status.controller.js
├── middleware/
│   └── upload.js
├── route/
│   ├── audio.route.js
│   ├── chat.route.js
│   ├── embeddings.route.js
│   ├── images.route.js
│   └── status.route.js
├── .env
├── constants.js
├── package.json
├── README.md
└── server.js
```

## Configuration

The server can be configured using environment variables in the `.env` file:

- `PORT`: The port on which the server will run (default: 5000)
- `API_BASE_URL`: The base URL of the private API to proxy requests to
- `NODE_ENV`: The environment mode (development or production)


## Acknowledgements

- [Express.js](https://expressjs.com/)
- [Needle](https://github.com/tomas/needle)
- [Multer](https://github.com/expressjs/multer)
- [Dotenv](https://github.com/motdotla/dotenv)
- [CORS](https://github.com/expressjs/cors)
- [Morgan](https://github.com/expressjs/morgan)

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
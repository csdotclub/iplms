# iplms

IPLMS is a microservice to allow for IP logging and fingerprint capturing (when the page includes FingerprintJS2.) It uses `@zeit/micro` for HTTP.

## Setup

1. Copy .env.example to .env: `cp .env.example .env`
2. Add your *full* MongoDB connection string. (If you need a hosting service, try MongoDB Atlas.)
3. Run with `npm start` or `pm2 start apps.json`. IPLMS will be listening on port 3452.

## Setup (Frontend)

1. Get a copy of FingerprintJS2 [here](https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js) and save it to your computer.
2. In your HTML page, before the end of the `<body>` tag, include the copy of FingerprintJS2, and then include client.js with the script tag.
3. Upload your files to your web host (be sure to include your FingerprintJS2 copy.)

## License

MIT
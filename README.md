# 💕 Valentine's Day Website

A fun, interactive Valentine's Day proposal website with animated buttons, confetti, balloons, and roses!

## 🎯 Features

- **Interactive Buttons**: Yes and No buttons with unique behaviors
- **"No" Button Effects**:
  - Increases the "Yes" button size with each click
  - Triggers shake animation on "Yes" button
  - Displays random funny rejection messages
- **"Yes" Button Celebration**:
  - Confetti cannon effect from both sides
  - Floating balloons animation
  - Falling roses effect
  - Background music playback
  - Modal popup with random acceptance message

## 📁 Project Structure

```
valentines/
├── assets/                           # Static assets
│   ├── audio/                        # Audio files
│   ├── icons/                        # Icons (favicon)
│   └── images/                       # Future images
├── css/                              # Stylesheets
│   └── styles.css
├── js/                               # JavaScript
│   └── script.js
├── index.html                        # Main HTML file
├── package.json                      # Project metadata
├── .editorconfig                     # Code style config
├── Dockerfile                        # Container image
├── deploy.sh                         # Deploy to GCP
└── README.md                         # This file
```

## 🚀 Quick Start

### Local Development

```bash
# Option 1: Just open the file
open index.html

# Option 2: Use npm script
npm run dev
# Then visit: http://localhost:8000

# Option 3: Use a simple server directly
npx http-server -p 8000
# Then visit: http://localhost:8000
```

## ☁️ Deploy to Google Cloud Run

### Prerequisites

- Google Cloud Platform account
- [gcloud CLI](https://cloud.google.com/sdk/docs/install) installed
- Docker installed

### Quick Deploy

### Deploy with Script

```bash
./deploy.sh YOUR-PROJECT-ID europe-west3
```

The script will:

1. Create Artifact Registry repository (if needed)
2. Build Docker image locally
3. Push to Artifact Registry
4. Deploy to Cloud Run

### Manual Deploy

```bash
# 1. Setup
gcloud config set project YOUR-PROJECT-ID
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
gcloud artifacts repositories create valentines --repository-format=docker --location=europe-west3
gcloud auth configure-docker europe-west3-docker.pkg.dev

# 2. Build and push
docker build -t europe-west3-docker.pkg.dev/YOUR-PROJECT-ID/valentines/valentines-website .
docker push europe-west3-docker.pkg.dev/YOUR-PROJECT-ID/valentines/valentines-website

# 3. Deploy
gcloud run deploy valentines-website \
  --image europe-west3-docker.pkg.dev/YOUR-PROJECT-ID/valentines/valentines-website \
  --region europe-west3 \
  --allow-unauthenticated
```

### Test Locally

Test the Docker image locally before deploying:

```bash
# Build the image
docker build -t valentines-website .

# Run locally on port 8080
docker run -p 8080:8080 valentines-website

# Visit: http://localhost:8080
```

### How It Works

1. Docker builds an image with your static files
2. Image gets pushed to Google Artifact Registry (europe-west3)
3. Cloud Run serves your website from that image

**Configuration**: 256Mi memory, 1 CPU, auto-scaling 0-10 instances, port 8080

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Animations**: CSS keyframes + canvas-confetti library
- **Deployment**: Docker + Google Cloud Run

## 🎨 Customization

### Adjust Animation Settings

Edit constants in `script.js`:

```javascript
const CONFIG = {
  yesButtonScaleIncrement: 0.3, // How much YES button grows
  balloonCount: 15, // Number of balloons
  roseCount: 30, // Number of roses
  confettiDuration: 5000, // Confetti duration (ms)
};
```

### Change Colors

Modify color arrays in `script.js`:

```javascript
const COLORS = {
  balloons: ["#ff6b9d", "#c06c84", "#ee4266", "#ff91af", "#ffd3e1"],
  confetti: ["#ff0000", "#ff69b4", "#ff1493", "#fff", "#ffc0cb"],
};
```

### Add/Edit Messages

Update the text arrays in `script.js`:

- `NO_BUTTON_TEXTS` for rejection messages
- `YES_BUTTON_TEXTS` for acceptance messages

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- 📱 Responsive on mobile devices

## 🎵 Audio Note

The background music requires user interaction to play (browser autoplay policy). If music doesn't play automatically, check your browser's autoplay settings.

## 📝 License

Feel free to use and modify for your own Valentine's Day proposals! 💝

## 🤝 Contributing

This is a personal project, but feel free to fork and customize it for your own romantic endeavors!

---

Made with ❤️ for Valentine's Day

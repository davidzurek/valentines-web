#!/bin/bash

# Valentine's Website - GCP Cloud Run Deployment Script
# Usage: ./deploy.sh [PROJECT_ID] [REGION]

set -e

# Configuration
PROJECT_ID="${1:-your-gcp-project-id}"
REGION="${2:-europe-west3}"
SERVICE_NAME="valentines-website"
REPOSITORY="valentines"
IMAGE_NAME="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${SERVICE_NAME}"

echo "🚀 Deploying Valentine's Website to Google Cloud Run"
echo "   Project: $PROJECT_ID"
echo "   Region: $REGION"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "   Install: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed"
    echo "   Install: https://docs.docker.com/get-docker/"
    exit 1
fi

# Set the project
echo "📋 Setting GCP project..."
gcloud config set project "$PROJECT_ID"
gcloud config set run/region "$REGION"

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Create Artifact Registry repository if it doesn't exist
echo "📦 Setting up Artifact Registry..."
if ! gcloud artifacts repositories describe "$REPOSITORY" --location="$REGION" &>/dev/null; then
    echo "Creating Artifact Registry repository..."
    gcloud artifacts repositories create "$REPOSITORY" \
        --repository-format=docker \
        --location="$REGION" \
        --description="Valentine's website container images"
else
    echo "Artifact Registry repository already exists"
fi

# Configure Docker to authenticate with Artifact Registry
echo "🔑 Configuring Docker authentication..."
gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet

# Build the container image locally
echo "🏗️  Building container image locally..."
docker build --platform linux/amd64 -t "$IMAGE_NAME:latest" .

# Push the container image to Artifact Registry
echo "📤 Pushing image to Artifact Registry..."
docker push "$IMAGE_NAME:latest"

# Deploy to Cloud Run
echo "🚢 Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
    --image "$IMAGE_NAME:latest" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --port 8080 \
    --memory 256Mi \
    --cpu 1 \
    --max-instances 3 \
    --min-instances 0

# Get the service URL
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" \
    --platform managed \
    --region "$REGION" \
    --format 'value(status.url)')

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your Valentine website is live at: $SERVICE_URL"
echo ""
echo "💡 To view logs:"
echo "   gcloud logging read \"resource.type=cloud_run_revision AND resource.labels.service_name=$SERVICE_NAME\" --limit 50"
echo ""
echo "💡 To delete the service:"
echo "   gcloud run services delete $SERVICE_NAME --region $REGION"

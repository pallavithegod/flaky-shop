# "Project VM" container: Node app supervised by the RecallOps sidecar watcher.
# Build context is the ima-agent-backend-python repo root.
FROM node:22-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-httpx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY demo-apps/flaky-shop/package.json ./
RUN npm install --omit=dev
COPY demo-apps/flaky-shop/ ./
COPY sidecar/watcher.py /sidecar/watcher.py

ENV APP_CMD="node server.js" \
    HEALTH_URL="http://localhost:3000/health" \
    PORT=3000

EXPOSE 3000
ENTRYPOINT ["python3", "/sidecar/watcher.py"]

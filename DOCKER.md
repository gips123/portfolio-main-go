# Docker Setup untuk Portfolio Next.js

Dokumentasi untuk menjalankan aplikasi portfolio menggunakan Docker.

## 📋 Prerequisites

- Docker installed (version 20.10+)
- Docker Compose installed (version 2.0+)

## 🚀 Quick Start

### 1. Build dan Run dengan Docker Compose

```bash
# Build dan start container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down
```

### 2. Build dan Run dengan Docker CLI

```bash
# Build image
docker build -t best-portfolio .

# Run container
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE=http://localhost:8080 \
  --name best-portfolio \
  best-portfolio

# View logs
docker logs -f best-portfolio

# Stop container
docker stop best-portfolio
docker rm best-portfolio
```

## 🔧 Environment Variables

Buat file `.env` atau set environment variables:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

Atau gunakan docker-compose dengan environment file:

```yaml
# docker-compose.yml
environment:
  - NEXT_PUBLIC_API_BASE=${NEXT_PUBLIC_API_BASE:-http://localhost:8080}
```

## 📦 Dockerfile Structure

Dockerfile menggunakan multi-stage build untuk optimasi:

1. **deps stage**: Install dependencies
2. **builder stage**: Build aplikasi Next.js
3. **runner stage**: Production image dengan minimal dependencies

## 🎯 Features

- ✅ Multi-stage build untuk image size yang lebih kecil
- ✅ Standalone output untuk optimasi
- ✅ Non-root user untuk security
- ✅ Alpine Linux untuk image size yang kecil
- ✅ Production-ready configuration

## 🔍 Troubleshooting

### Port sudah digunakan

```bash
# Cek port yang digunakan
lsof -i :3000

# Atau gunakan port lain
docker run -p 3001:3000 best-portfolio
```

### Build error (npm ci fails)

Jika `npm ci` gagal, coba:

```bash
# Option 1: Clear Docker cache dan rebuild
docker builder prune
docker build --no-cache -t best-portfolio .

# Option 2: Gunakan Dockerfile.simple (single-stage build)
docker build -f Dockerfile.simple -t best-portfolio .

# Option 3: Fix package-lock.json
rm package-lock.json
npm install
docker build -t best-portfolio .
```

### I/O Error di Docker

Jika muncul error "input/output error" atau "EIO: i/o error":

**Langkah 1: Restart Docker Desktop**
```bash
# Restart Docker Desktop sepenuhnya
# macOS: Quit Docker Desktop dari menu bar, lalu buka lagi
```

**Langkah 2: Check Disk Space**
```bash
# Check available disk space
df -h

# Jika disk space penuh, bersihkan:
docker system prune -a --volumes
```

**Langkah 3: Clear Docker Build Cache**
```bash
# Clear build cache
docker builder prune -a

# Rebuild dengan --no-cache
docker-compose build --no-cache
```

**Langkah 4: Increase Docker Resources (macOS)**
- Buka Docker Desktop → Settings → Resources
- Increase Memory (minimal 4GB)
- Increase Disk Image Size jika perlu

**Langkah 5: Alternative - Build dengan pendekatan berbeda**
```bash
# Jika masih error, coba build langsung tanpa compose
docker build --no-cache --progress=plain -t best-portfolio .
```

**Langkah 6: Check Docker Logs**
```bash
# Check Docker Desktop logs untuk detail error
# macOS: ~/Library/Containers/com.docker.docker/Data/log/
```

### npm install error

Jika ada peer dependency issues:

```bash
# Update Dockerfile untuk menggunakan --legacy-peer-deps
# Atau fix package.json dependencies
npm install --legacy-peer-deps
```

### Container tidak start

```bash
# Check logs
docker logs best-portfolio

# Check container status
docker ps -a

# Check if port is available
netstat -an | grep 3000
```

## 📊 Image Size

Dengan multi-stage build dan standalone output, image size sekitar:
- **~150-200MB** (dengan Alpine Linux)

## 🔐 Security

- Container berjalan sebagai non-root user (`nextjs`)
- Minimal dependencies di production image
- Alpine Linux untuk security updates yang lebih cepat

## 🚢 Production Deployment

Untuk production, pertimbangkan:

1. **Use reverse proxy** (nginx, traefik)
2. **Set proper environment variables**
3. **Enable HTTPS**
4. **Use container orchestration** (Kubernetes, Docker Swarm)
5. **Monitor logs and metrics**

### Example dengan Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 Notes

- Pastikan backend API sudah running sebelum start container
- Update `NEXT_PUBLIC_API_BASE` sesuai dengan environment
- Untuk development, gunakan `npm run dev` langsung
- Docker image hanya untuk production build


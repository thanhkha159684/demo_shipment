# Demo Shipment Project

Demo project for shipment management system using microservices architecture with Docker.

## 🚀 Technologies Used

- **Frontend**: Next.js 
- **Backend**: NestJS
- **Containerization**: Docker & Docker Compose
- **Network**: Bridge network for inter-service communication

## 📁 Project Structure

```
demo_shipment/
├── frontend/           # Next.js application
│   ├── Dockerfile
│   └── package.json
├── backend/            # NestJS application
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml  # Docker services configuration
└── README.md
```

## 🛠️ Installation and Running the Project

### System Requirements

- Docker Desktop
- Docker Compose
- Git

### Running the Project

1. **Clone repository**
   ```bash
   git clone git@github.com:thanhkha159684/demo_shipmment.git
   cd demo_shipment
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Run in background mode**
   ```bash
   docker-compose up -d --build
   ```

### Access Applications

- **Frontend (Next.js)**: http://localhost:3000
- **Backend (NestJS)**: http://localhost:3001

## 🔧 Development

### Run individual services

**Frontend only:**
```bash
docker-compose up frontend --build
```

**Backend only:**
```bash
docker-compose up backend --build
```

### View logs

```bash
# View all logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Stop services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop, remove volumes and images
docker-compose down -v --rmi all
```

## ⚙️ Configuration

### Environment Variables

**Frontend:**
- `NODE_ENV=development`
- `NEXT_PUBLIC_API_URL=http://backend:3001`
- `CHOKIDAR_USEPOLLING=true` - Enable file watching in Docker
- `FAST_REFRESH=true` - Enable React Fast Refresh

**Backend:**
- `NODE_ENV=development`
- `PORT=3001`
- `CHOKIDAR_USEPOLLING=true` - Enable file watching in Docker

### Hot Reload

The project is configured to support hot reload in Docker:
- Frontend: Uses Next.js Fast Refresh
- Backend: Uses NestJS watch mode
- File watching uses polling to work well in Docker

## 🐳 Docker Services

### Frontend Service
- **Port**: 3000
- **Volume mounts**: Source code, node_modules, .next cache
- **Auto-install**: Dependencies are installed automatically on startup

### Backend Service
- **Port**: 3001
- **Volume mounts**: Source code, node_modules
- **Auto-install**: Dependencies are installed automatically on startup

### Network
- Uses `app-network` bridge for services to communicate with each other
- Frontend can call backend API via `http://backend:3001`

## 🚨 Troubleshooting

### Container fails to start
```bash
# Check detailed logs
docker-compose logs [service-name]

# Rebuild from scratch
docker-compose down
docker-compose up --build --force-recreate
```

### Port conflicts
```bash
# Check ports in use (Windows)
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill process if needed
taskkill /PID [PID_NUMBER] /F
```

### Hot reload not working
- Ensure `CHOKIDAR_USEPOLLING=true` is set
- Check volume mounts in docker-compose.yml
- Restart containers: `docker-compose restart`

### npm install errors
```bash
# Clear Docker cache and rebuild
docker-compose down
docker system prune -f
docker-compose up --build --no-cache
```

## 📝 Notes

- Project uses volume mounts to sync code between host and container
- Dependencies are installed automatically when container starts
- File watching is optimized for Docker environment
- Bridge network allows communication between frontend and backend

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit Pull Request

## 📄 License

This project is licensed under the MIT License.

FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY templates/ ./templates/

WORKDIR /app/backend

EXPOSE 3000

CMD ["npm", "start"]

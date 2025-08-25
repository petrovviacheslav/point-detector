# Стадия сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
#COPY .npmrc ./

# Устанавливаем зависимости
RUN npm ci && npm cache clean --force

# Копируем исходный код
COPY src ./src
COPY public ./public

# Собираем приложение
RUN npm run build

# Финальная стадия
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

# Копируем собранное приложение из стадии builder
COPY --from=builder /app/build ./build

RUN npm install -g serve

# Открываем порт
EXPOSE 3000

# Запускаем статический сервер
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
# NestJS Admin Panel API

## 🚀 Описание проекта

Это современное REST API приложение, построенное на базе NestJS фреймворка, предоставляющее полный набор функций для управления административной панелью. Проект реализует надежную и масштабируемую архитектуру с использованием TypeScript и следует лучшим практикам разработки.

## ✨ Основные возможности

- 🔐 Полная система аутентификации и авторизации
- 👥 Управление пользователями и ролями
- 🏢 Управление компаниями
- 📅 Система событий
- 📁 Управление файлами
- 👤 Управление аккаунтами
- 🔄 Миграции базы данных

## 🛠 Технологический стек

- **Backend Framework:** NestJS 9.x
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** class-validator, class-transformer
- **Testing:** Jest
- **Code Quality:** ESLint, Prettier

## 📋 Требования

- Node.js (рекомендуется версия 16.x или выше)
- PostgreSQL 12.x или выше
- npm или yarn

## 🚀 Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone [url-репозитория]
cd nest-admin-panel-api
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл .env в корневой директории и настройте переменные окружения:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret
```

4. Запустите миграции:
```bash
npm run migration:run
```

5. Запустите приложение:
```bash
# Режим разработки
npm run start:dev

# Продакшн режим
npm run build
npm run start:prod
```

## 📚 Доступные скрипты

- `npm run start:dev` - Запуск в режиме разработки
- `npm run build` - Сборка проекта
- `npm run start:prod` - Запуск в продакшн режиме
- `npm run test` - Запуск тестов
- `npm run test:e2e` - Запуск end-to-end тестов
- `npm run migration:create` - Создание новой миграции
- `npm run migration:run` - Запуск миграций
- `npm run migration:revert` - Откат последней миграции

## 🏗 Структура проекта

```
src/
├── account/        # Модуль управления аккаунтами
├── auth/          # Модуль аутентификации
├── company/       # Модуль управления компаниями
├── decorators/    # Пользовательские декораторы
├── events/        # Модуль управления событиями
├── files/         # Модуль управления файлами
├── member/        # Модуль управления участниками
└── roles/         # Модуль управления ролями
```

## 🔒 Безопасность

- JWT аутентификация
- Хеширование паролей с использованием bcrypt
- Валидация входных данных
- Защита от SQL-инъекций через TypeORM
- CORS настройки





# Code Haven — российский Git-хостинг

## В комплекте
- REST API на Node.js + Express
- PostgreSQL
- Next.js-фронтенд
- Smart-HTTP Git-протокол (clone / push / pull)
- Pull Request, Issues, Wiki  
- CI/CD-раннеры в Selectel / Yandex Cloud  
- AI-ревью через Yandex GPT  
- Авторизация ЕСИА / ГосТех  
- ФСТЭК-совместимый аудит и шифрование  
- Русский интерфейс
- 100 % Docker

## Запуск
```bash
cp backend/.env.example backend/.env
cp runner/.env.runner.example runner/.env.runner
docker compose up --build


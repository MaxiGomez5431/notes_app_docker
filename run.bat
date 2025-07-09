@echo off
docker compose down
docker system prune -f
docker compose up --build -d

echo.
echo ==================================================
echo Note app ready!
echo - Frontend: http://localhost
echo - Backend (API): http://localhost:3000
echo - Data Base:
echo   Host: localhost:5432
echo   DB: notes_app
echo   User: postgres
echo   Pasword: postgres
echo ==================================================
pause
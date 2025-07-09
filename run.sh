#!/bin/bash

docker compose down

docker compose up --build -d

echo ""
echo "=================================================="
echo "Note app ready!"
echo "Frontend: http://localhost"
echo "Backend:  http://localhost:3000"
echo "Data Base:"
echo "  Host: localhost:5432"
echo "  DB: notes_app"
echo "  User: postgres"
echo "  Pass: postgres"
echo "=================================================="
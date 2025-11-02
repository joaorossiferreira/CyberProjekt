# Script para iniciar Expo em modo Expo Go com Tunnel
Write-Host "🚀 Iniciando Expo em modo Tunnel para Expo Go..." -ForegroundColor Cyan

# Limpar cache
Write-Host "🧹 Limpando cache do Expo..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue

# Iniciar com tunnel
Write-Host "📡 Iniciando servidor com tunnel..." -ForegroundColor Green
npx expo start --tunnel --clear

Write-Host "✅ Servidor iniciado! Escaneie o QR code com Expo Go" -ForegroundColor Green

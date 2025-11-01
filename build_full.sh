#!/bin/bash
cd "/mnt/c/Users/João/Desktop/projeto/cyberprojekt"
echo "Instalando node_modules..."
npm install
echo ""
echo "Instalando pods (se necessário)..."
cd android
echo "Fazendo build..."
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
./gradlew clean assembleRelease

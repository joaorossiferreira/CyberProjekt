#!/bin/bash
cd /mnt/c/Users/João/Desktop/projeto/cyberprojekt
echo "Removendo pasta android antiga..."
rm -rf android
echo "Executando expo prebuild..."
npx expo prebuild --platform android
echo "Atualizando local.properties..."
cd android
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
echo "ndk.dir=$HOME/Android/Sdk/ndk/27.1.12297006" >> local.properties
echo "Fazendo build do APK..."
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
./gradlew clean assembleRelease

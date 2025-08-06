
### `Dockerfile
# Dockerfile для Flutter-приложения
FROM cirrusci/flutter:stable as build

# Копируем исходный код в контейнер
COPY . /app

# Устанавливаем зависимости и строим APK
WORKDIR /app
RUN flutter pub get
RUN flutter build apk --release

# Создаем новый контейнер для запуска приложения
FROM openjdk:11-jre-slim

# Устанавливаем ADB и утилиты для работы с Android
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Скачиваем и устанавливаем Android SDK
RUN wget -q https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip -O android-sdk.zip
RUN unzip android-sdk.zip -d /usr/local/android-sdk
ENV ANDROID_HOME=/usr/local/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Устанавливаем необходимые пакеты SDK
RUN echo "y" | $ANDROID_HOME/tools/bin/sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3"

# Копируем APK из контейнера сборки в контейнер запуска
COPY --from=build /app/build/app/outputs/flutter-apk/app-release.apk /app-release.apk

# Запускаем ADB сервер
CMD ["adb", "start-server"]
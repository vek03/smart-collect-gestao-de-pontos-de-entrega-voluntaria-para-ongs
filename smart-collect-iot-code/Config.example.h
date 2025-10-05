#pragma once

// ====== HOTSPOT & OTA ======
constexpr const char* HOTSPOT_SSID = "smart-collect-iot";
constexpr const char* HOTSPOT_PASS = "123456789";
constexpr const char* OTA_HOSTNAME = "smart-collect-iot"; // mDNS: smart-collect-iot.local
constexpr const char* OTA_PASSWORD = "123456789";

// ====== FIREBASE REALTIME ======
constexpr const char* FIREBASE_DEVICE_ID = "1X";
constexpr const char* FIREBASE_REFERENCE_URL = "YOUR_FIREBASE_REFERENCE_URL";
constexpr const char* FIREBASE_AUTH_TOKEN = "YOUR_FIREBASE_AUTH_TOKEN";

// ====== Informações do Ponto de Coleta ======
constexpr float HEIGHT_SMARTCOLLECT_IN_CENTIMETERS = 62;

// ====== DISPLAY OLED ======
constexpr uint8_t OLED_I2C_ADDR = 0x27; // comum: 0x27 ou 0x3F
constexpr uint8_t OLED_SCREEN_WIDTH = 128;
constexpr uint8_t OLED_SCREEN_HEIGHT = 64;
constexpr uint8_t OLED_RESET = -1;

// ====== SENSORES ULTRASSÔNICOS ======
// Sensor A (AJ-SR04M)
constexpr int TRIG_A = 16;
constexpr int ECHO_A = 17;
// Sensor B (HC-SR04)
constexpr int TRIG_B = 15;
constexpr int ECHO_B = 4;
// Sensor C (AJ-SR04M)
constexpr int TRIG_C = 18;
constexpr int ECHO_C = 5;

// Tempo entre as leituras
const unsigned long DISPLAY_INTERVAL_MS = 5000;

// Tempo máximo de eco (us) ~ distância máx. ~ 5m -> ~30000 us
constexpr unsigned long PULSE_TIMEOUT_US = 30000;

// Amostras e mitigação de crosstalk
constexpr int ULTRA_SAMPLES = 5;
constexpr int ULTRA_SAMPLE_INTERVAL_MS = 10;
constexpr int INTER_SENSOR_DELAY_MS = 60; // tempo entre leituras dos sensores

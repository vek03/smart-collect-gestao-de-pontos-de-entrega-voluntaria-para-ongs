#pragma once

// ====== WI-FI ======
constexpr const char* WIFI_SSID = "SEU_SSID";
constexpr const char* WIFI_PASS = "SUA_SENHA";
constexpr const char* OTA_HOSTNAME = "esp32-lixeira"; // mDNS: esp32-lixeira.local

// ====== LCD I2C ======
constexpr uint8_t LCD_I2C_ADDR = 0x27; // comum: 0x27 ou 0x3F
constexpr uint8_t LCD_COLS = 16;
constexpr uint8_t LCD_ROWS = 2;

// ====== SENSORES ULTRASSÔNICOS ======
// Sensor A
constexpr int TRIG_A = 12;
constexpr int ECHO_A = 14;
// Sensor B
constexpr int TRIG_B = 27;
constexpr int ECHO_B = 26;

// Tempo máximo de eco (us) ~ distância máx. ~ 5m -> ~30000 us
constexpr unsigned long PULSE_TIMEOUT_US = 30000;

// Amostras e mitigação de crosstalk
constexpr int ULTRA_SAMPLES = 5;
constexpr int ULTRA_SAMPLE_INTERVAL_MS = 10;
constexpr int INTER_SENSOR_DELAY_MS = 60; // tempo entre leituras dos sensores

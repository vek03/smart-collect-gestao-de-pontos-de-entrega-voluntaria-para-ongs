#pragma once
#include <Arduino.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

enum class TextPos {
  TOP_LEFT, TOP_CENTER, TOP_RIGHT,
  MIDDLE_LEFT, MIDDLE_CENTER, MIDDLE_RIGHT,
  BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT
};

class OledDisplay {
public:
  OledDisplay(const uint8_t width = 128, const uint8_t height = 64, int8_t resetPin = -1);
  void begin(uint8_t i2cAddr = 0x3C);
  void clear();
  void setWiFiStatus(bool connected);
  void setFirebaseStatus(bool ready);
  void setOtaStatus(bool ready);
  void printText(const String& text, TextPos pos);
  void drawBitmapAt(int16_t x, int16_t y, const uint8_t bitmap[], int16_t w, int16_t h, uint16_t color = SSD1306_WHITE);
  void showLoading(const String& message = "Carregando...", int delayMs = 150, int cycles = 1);
  void update();

private:
  Adafruit_SSD1306 _display;
  const uint8_t _width, _height;
  bool _wifiConnected, _firebaseReady, _otaReady;

  void drawWiFiIcon();
  void drawFirebaseIcon();
  void drawOtaIcon();
  void drawLoadingCircle(int segment, int numSegments);
  void drawX(int x, int y, int size);
};

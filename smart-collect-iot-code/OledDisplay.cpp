#include "OledDisplay.h"
#include "Icons.h"

OledDisplay::OledDisplay(const uint8_t width, const uint8_t height, int8_t resetPin)
: _display(width, height, &Wire, resetPin), _width(width), _height(height), _wifiConnected(false), _firebaseReady(false), _otaReady(false) {}

void OledDisplay::begin(uint8_t i2cAddr) {
  if (!_display.begin(SSD1306_SWITCHCAPVCC, i2cAddr)) {
    Serial.println(F("SSD1306 não encontrado!"));
    for(;;); // trava
  }
  clear();
  update();
}

void OledDisplay::clear() {
  _display.clearDisplay();
}

void OledDisplay::setWiFiStatus(bool connected) {
  _wifiConnected = connected;
}

void OledDisplay::setFirebaseStatus(bool ready) {
  _firebaseReady = ready;
}

void OledDisplay::setOtaStatus(bool ready) {
  _otaReady = ready;
}

void OledDisplay::printText(const String& text, TextPos pos) {
  int16_t x, y;
  uint16_t w, h;

  _display.setTextSize(1);
  _display.setTextColor(SSD1306_WHITE);
  _display.getTextBounds(text.c_str(), 0, 0, &x, &y, &w, &h);

  switch (pos) {
    case TextPos::TOP_LEFT:      x = 0; y = 0; break;
    case TextPos::TOP_CENTER:    x = (_width - w) / 2; y = 0; break;
    case TextPos::TOP_RIGHT:     x = _width - w; y = 0; break;

    case TextPos::MIDDLE_LEFT:   x = 0; y = (_height - h) / 2; break;
    case TextPos::MIDDLE_CENTER: x = (_width - w) / 2; y = (_height - h) / 2; break;
    case TextPos::MIDDLE_RIGHT:  x = _width - w; y = (_height - h) / 2; break;

    case TextPos::BOTTOM_LEFT:   x = 0; y = _height - h; break;
    case TextPos::BOTTOM_CENTER: x = (_width - w) / 2; y = _height - h; break;
    case TextPos::BOTTOM_RIGHT:  x = _width - w; y = _height - h; break;
  }

  _display.setCursor(x, y);
  _display.print(text);
}

void OledDisplay::drawBitmapAt(int16_t x, int16_t y, const uint8_t bitmap[], int16_t w, int16_t h, uint16_t color) {
  _display.drawBitmap(x, y, bitmap, w, h, color);
}

void OledDisplay::showLoading(const String& message, int delayMs, int cycles) {
  for (int i = 0; i < cycles; i++) {
    for (int dots = 0; dots < 4; dots++) {
      clear();
      update();
      _display.setTextSize(1);
      _display.setTextColor(SSD1306_WHITE);
      _display.setCursor(0, (_height / 2) - 4); 
      _display.print(message);

      for (int d = 0; d < dots; d++) {
        _display.print(".");
      }

      update();
      delay(delayMs);
    }
  }

  delay(delayMs);
  clear();
}

void OledDisplay::drawWiFiIcon() {
  int x = _width - 16;  // canto superior direito
  int y = 0;
  int size = 16;

  if (_wifiConnected) {
    drawBitmapAt(x, y, wifiConnected16x16, 16, 16, SSD1306_WHITE);
    drawX(x, y, size);
  } else {
    drawBitmapAt(x, y, wifiConnected16x16, 16, 16, SSD1306_WHITE);
    drawX(x, y, size);
  }
}

void OledDisplay::drawFirebaseIcon() {
  int x = _width - 16;  // canto inferior direito
  int y = _height - 16;
  int size = 16;

  if (_firebaseReady){
    printText("FB", TextPos::MIDDLE_RIGHT);
    drawX(x, y, size);
  } else {
    printText("FB", TextPos::MIDDLE_RIGHT);
    drawX(x, y, size);
  }
}

void OledDisplay::drawOtaIcon() {
  int x = _width - 16;  // canto central direito
  int y = _height - 16;
  int size = 16;

  if (_otaReady){
    printText("OTA", TextPos::BOTTOM_RIGHT);
    drawX(x, y, size);
  } else {
    printText("OTA", TextPos::BOTTOM_RIGHT);
    drawX(x, y, size);
  }
}

void OledDisplay::drawX(int x, int y, int size) {
  _display.drawLine(x, y, x + size - 1, y + size - 1, SSD1306_WHITE);

  _display.drawLine(x, y + size - 1, x + size - 1, y, SSD1306_WHITE);

  _display.display();
}

void OledDisplay::update() {
  drawWiFiIcon();
  drawOtaIcon();
  drawFirebaseIcon();
  _display.display();
}

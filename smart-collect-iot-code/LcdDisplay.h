#pragma once
#include <Arduino.h>
#include <LiquidCrystal_I2C.h>

class LcdDisplay {
public:
  LcdDisplay(uint8_t addr, uint8_t cols, uint8_t rows);
  void begin();
  void printLine(uint8_t row, const String& text);
  void clear();

private:
  LiquidCrystal_I2C _lcd;
  uint8_t _cols, _rows;
};

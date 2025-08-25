#include "LcdDisplay.h"

LcdDisplay::LcdDisplay(uint8_t addr, uint8_t cols, uint8_t rows)
: _lcd(addr, cols, rows), _cols(cols), _rows(rows) {}

void LcdDisplay::begin() {
  _lcd.init();
  _lcd.backlight();
  _lcd.clear();
}

void LcdDisplay::printLine(uint8_t row, const String& text) {
  if (row >= _rows) return;
  String padded = text;
  // garante limpar o restante da linha
  while (padded.length() < _cols) padded += ' ';
  _lcd.setCursor(0, row);
  _lcd.print(padded.substring(0, _cols));
}

void LcdDisplay::clear() {
  _lcd.clear();
}

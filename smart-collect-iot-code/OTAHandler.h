#pragma once
#include <ArduinoOTA.h>
#include "OledDisplay.h"

class OTAHandler {
public:
  OTAHandler(OledDisplay& display);
  void begin(const char* hostname, const char* password);
  void handle(bool isConnected);

private:
  OledDisplay& _display;
};
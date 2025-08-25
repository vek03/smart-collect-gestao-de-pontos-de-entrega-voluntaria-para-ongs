#pragma once
#include <ArduinoOTA.h>

class OTAHandler {
public:
  void begin(const char* hostname);
  void handle();
};

#pragma once
#include <WiFi.h>
#include "OledDisplay.h"

class WifiManager {
public:
  WifiManager(OledDisplay& display);
  void begin(const char* ssid, const char* pass);
  bool isConnected() const;
  void loop();
  
private:
  OledDisplay& _display;

  unsigned long _lastCheck = 0;
};

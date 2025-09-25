#pragma once
#include <WiFi.h>
#include "OledDisplay.h"
#include <WiFiManager.h>

class WifiManagerSC {
public:
  WifiManagerSC(OledDisplay& display, const char* ssid, const char* password);
  void begin();
  bool isConnected() const;
  void loop();
  
private:
  WiFiManager wm;
  OledDisplay& _display;
  const char* _ssid;
  const char* _password;

  unsigned long _lastCheck = 0;
};

#pragma once
#include <WiFi.h>

class WifiManager {
public:
  void begin(const char* ssid, const char* pass);
  bool isConnected() const;
  void loop(); // opcional para futuras estratégias (reconexão, etc.)
private:
  unsigned long _lastCheck = 0;
};

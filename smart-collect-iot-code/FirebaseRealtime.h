#pragma once
#include <Firebase.h>
#include <ArduinoJson.h>
#include "OledDisplay.h"

class FirebaseRealtime {
public:
  FirebaseRealtime(const char* url, const char* token, OledDisplay& display);
  void begin(const char* deviceId);
  void setAverageCm(float averageCm);
  void setFillPercentage(float fillPercentage);
  void setIsFull(bool isFull);
  void clearJson();
  void setErrors(bool sensor1, bool sensor2, bool sensor3);
  int sendJson();
  void loop(bool isConnected);

private:
  Firebase _fb;
  JsonDocument _json;
  OledDisplay& _display;
  const char* _deviceId;
  bool _hasError = false;
};

#pragma once
#include <Firebase.h>
#include <ArduinoJson.h>
#include "OledDisplay.h"

class FirebaseRealtime {
public:
  FirebaseRealtime(const char* url, const char* token, OledDisplay& display);
  void begin(const char* deviceId);
  int sendValues(float cmValue, bool isFull);
  bool setHasError();
  void loop(bool isConnected);

private:
  Firebase _fb;
  JsonDocument _json;
  OledDisplay& _display;
  const char* _deviceId;
  bool _hasError = false;

  int sendJson();
};

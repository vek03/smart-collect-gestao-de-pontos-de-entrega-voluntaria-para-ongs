#pragma once
#include <Firebase.h>
#include <ArduinoJson.h>

class FirebaseRealtime {
public:
  FirebaseRealtime(const char* url, const char* token);
  void begin(const char* deviceId);
  int sendValues(float cmValue, bool isFull);

private:
  Firebase _fb;
  JsonDocument _json;
  const char* _deviceId;

  int sendJson();
};

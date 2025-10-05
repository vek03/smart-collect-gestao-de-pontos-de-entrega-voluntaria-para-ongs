#include "FirebaseRealtime.h"

FirebaseRealtime::FirebaseRealtime(const char* url, const char* token, OledDisplay& display)
  : _fb(url, token), _display(display) {}

void FirebaseRealtime::begin(const char* deviceId) {
  _deviceId = deviceId;
  _display.setFirebaseStatus(true);
}

void FirebaseRealtime::setAverageCm(float averageCm) {
  _json["averageCm"] = averageCm;
}

void FirebaseRealtime::setFillPercentage(float fillPercentage) {
  _json["fillPercentage"] = fillPercentage;
}

void FirebaseRealtime::setIsFull(bool isFull) {
  _json["isFull"] = isFull;
}

void FirebaseRealtime::clearJson() {
  _json.clear();
}

void FirebaseRealtime::setErrors(bool sensor1, bool sensor2, bool sensor3) {
  _json["errors"]["sensor1"] = sensor1;
  _json["errors"]["sensor2"] = sensor2;
  _json["errors"]["sensor3"] = sensor3;
}

int FirebaseRealtime::sendJson() {
  String output;

  _json.shrinkToFit();

  serializeJson(_json, output);

  Serial.println("JSON data created:");
  Serial.println(output);
  Serial.println();

  Serial.println("Sending JSON to Firebase...");
  int responseCode = _fb.setJson(_deviceId, output);
  Serial.print("Set JSON - Response Code: ");
  Serial.println(responseCode);

  if (responseCode == 200) {
    Serial.println("JSON data successfully sent to Firebase!");
    _hasError = false;
  } else {
    Serial.println("Failed to send JSON data to Firebase!");
    Serial.print("Response code ");
    Serial.print(responseCode);
    Serial.println("Indicates an error occurred.");
    _hasError = true;
  }

  Serial.println();
  clearJson();

  return responseCode;
}

void FirebaseRealtime::loop(bool isConnected) {
  _display.setFirebaseStatus(!_hasError && isConnected);
}
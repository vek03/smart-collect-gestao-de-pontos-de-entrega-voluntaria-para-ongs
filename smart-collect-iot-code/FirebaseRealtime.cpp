#include "FirebaseRealtime.h"

FirebaseRealtime::FirebaseRealtime(const char* url, const char* token)
: _fb(url, token) {}

void FirebaseRealtime::begin(const char* deviceId){
  _deviceId = deviceId;
}

int FirebaseRealtime::sendValues(float averageCm, bool isFull){
  _json["averageCm"] = averageCm;
  _json["isFull"] = isFull;

  return sendJson();
}

int FirebaseRealtime::sendJson(){
  // Create a string to hold the serialized JSON data
  String output;

  // Optional: Shrink the JSON document to fit its contents exactly
  _json.shrinkToFit();

  // Serialize the JSON document to a string
  serializeJson(_json, output);

  Serial.println("JSON data created:");
  Serial.println(output);
  Serial.println();

  // Set the serialized JSON data in Firebase
  Serial.println("Sending JSON to Firebase...");
  int responseCode = _fb.setJson(_deviceId, output);
  Serial.print("Set JSON - Response Code: ");
  Serial.println(responseCode);

  if (responseCode == 200) {
      Serial.println("JSON data successfully sent to Firebase!");
  } else {
      Serial.println("Failed to send JSON data to Firebase!");
      Serial.print("Response code ");
      Serial.print(responseCode);
      Serial.println(" indicates an error occurred.");
  }

  Serial.println();

  return responseCode;
}

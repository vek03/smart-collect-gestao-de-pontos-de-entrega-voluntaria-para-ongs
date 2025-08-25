#include "OTAHandler.h"
#include <WiFi.h>

void OTAHandler::begin(const char* hostname) {
  ArduinoOTA.setHostname(hostname);

  ArduinoOTA
    .onStart([]() {
      String type = (ArduinoOTA.getCommand() == U_FLASH) ? "sketch" : "filesystem";
      Serial.println("[OTA] Start " + type);
    })
    .onEnd([]() {
      Serial.println("\n[OTA] End");
    })
    .onProgress([](unsigned int progress, unsigned int total) {
      Serial.printf("[OTA] Progresso: %u%%\r", (progress * 100) / total);
    })
    .onError([](ota_error_t error) {
      Serial.printf("[OTA] Erro [%u]\n", error);
    });

  ArduinoOTA.begin();
  Serial.print("[OTA] Pronto em: ");
  Serial.print(hostname);
  Serial.println(".local");
}

void OTAHandler::handle() {
  if (WiFi.status() == WL_CONNECTED) {
    ArduinoOTA.handle();
  }
}

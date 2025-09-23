#include "OTAHandler.h"
#include <WiFi.h>

OTAHandler::OTAHandler(OledDisplay& display) : _display(display) {}

void OTAHandler::begin(const char* hostname, const char* password) {
  ArduinoOTA.setHostname(hostname);
  ArduinoOTA.setPassword(password);

  ArduinoOTA
    .onStart([this]() {
      String type = (ArduinoOTA.getCommand() == U_FLASH) ? "sketch" : "filesystem";
      Serial.println("\n[OTA] Start " + type);
      _display.clear();
      _display.printText("OTA " + type + " Iniciado!", TextPos::MIDDLE_CENTER);
      delay(1000);
    })
    .onEnd([this]() {
      Serial.println("\n[OTA] End");
      _display.clear();
      _display.printText("OTA Finalizado!", TextPos::MIDDLE_CENTER);
    })
    .onProgress([this](unsigned int progress, unsigned int total) {
      Serial.printf("[OTA] Progresso: %u%%\r", (progress * 100) / total);
      _display.showLoading(String("Carregando OTA..."));
    })
    .onError([this](ota_error_t error) {
      Serial.printf("Erro[%u]: ", error);
      _display.clear();
      _display.printText("Erro no OTA! " + error, TextPos::MIDDLE_CENTER);
    });

  ArduinoOTA.begin();
  Serial.print("[OTA] Pronto em: ");
  Serial.print(hostname);
  _display.setOtaStatus(true);
}

void OTAHandler::handle(bool isConnected) {
  _display.setOtaStatus(isConnected);

  if (isConnected) ArduinoOTA.handle();
}

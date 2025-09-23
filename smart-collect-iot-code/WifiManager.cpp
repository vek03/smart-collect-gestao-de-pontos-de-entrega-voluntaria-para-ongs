#include "WifiManager.h"

WifiManager::WifiManager(OledDisplay& display) : _display(display) {}

void WifiManager::begin(const char* ssid, const char* pass) {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  Serial.println("Conectando ao Wifi:");
  Serial.println(ssid);
  _display.clear();

  int tries = 0;
  while (!isConnected() && tries < 25) {
    delay(200);
    _display.setWiFiStatus(false);
    _display.showLoading(String("Wifi..."));
    tries++;
  }

  Serial.println("Wifi Conectado!");
  _display.clear();
  _display.setWiFiStatus(true);
  _display.printText("WiFi Conectado!", TextPos::MIDDLE_LEFT);
  _display.update();
  delay(1500);
  _display.clear();
  _display.update();
}

bool WifiManager::isConnected() const {
  return WiFi.status() == WL_CONNECTED;
}

void WifiManager::loop() {
  _display.setWiFiStatus(isConnected());
}

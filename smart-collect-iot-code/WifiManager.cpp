#include "WifiManager.h"

void WifiManager::begin(const char* ssid, const char* pass) {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  Serial.print("[WiFi] Conectando a ");
  Serial.println(ssid);

  int tries = 0;
  while (WiFi.status() != WL_CONNECTED && tries < 50) {
    delay(200);
    Serial.print(".");
    tries++;
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("[WiFi] Conectado! IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("[WiFi] Falha de conexão (seguirá tentando em background).");
  }
}

bool WifiManager::isConnected() const {
  return WiFi.status() == WL_CONNECTED;
}

void WifiManager::loop() {
  // espaço para lógica de reconexão se quiser
}

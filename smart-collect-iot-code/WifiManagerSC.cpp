#include "WifiManagerSC.h"

WifiManagerSC::WifiManagerSC(OledDisplay& display, const char* ssid, const char* password) : _display(display), _ssid(ssid), _password(password) {}

void WifiManagerSC::begin() {
  _display.setWiFiStatus(false);
  _display.clear();
  _display.display();
  _display.printText("Conectando ao Wifi!", TextPos::TOP_LEFT);
  _display.printText("Acesse o Hotspot: " + String(_ssid), TextPos::MIDDLE_LEFT);
  _display.printText("E acesse pelo navegador: 192.168.4.1", TextPos::BOTTOM_LEFT);

  bool res = false;

  WiFi.mode(WIFI_STA);
  res = wm.autoConnect(_ssid, _password); 

  if(res){
    _display.clear();
    _display.setWiFiStatus(true);
    _display.printText("WiFi Conectado!", TextPos::MIDDLE_LEFT);
  }else {
    _display.clear();
    _display.setWiFiStatus(false);
    _display.printText("WiFi NÃO Conectado!", TextPos::MIDDLE_LEFT);
  }
  
  delay(1500);
  _display.clear();
  _display.update();
  delay(200);
}

bool WifiManagerSC::isConnected() const {
  return WiFi.status() == WL_CONNECTED;
}

void WifiManagerSC::loop() {
  _display.setWiFiStatus(isConnected());

  if(!isConnected()) {
    begin();
  }
}

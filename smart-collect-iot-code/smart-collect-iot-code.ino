#include <Arduino.h>
#include <Wire.h>
#include "Config.h"
#include "WifiManager.h"
#include "FirebaseRealtime.h"
#include "OTAHandler.h"
#include "UltrasonicSensor.h"
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <stdint.h>

OledDisplay oled(OLED_SCREEN_WIDTH, OLED_SCREEN_HEIGHT, OLED_RESET);
WifiManager wifi(oled);
FirebaseRealtime fb(FIREBASE_REFERENCE_URL, FIREBASE_AUTH_TOKEN, oled);
OTAHandler ota(oled);
UltrasonicSensor sensorA(TRIG_A, ECHO_A, PULSE_TIMEOUT_US);
UltrasonicSensor sensorB(TRIG_B, ECHO_B, PULSE_TIMEOUT_US);
UltrasonicSensor sensorC(TRIG_C, ECHO_C, PULSE_TIMEOUT_US);

unsigned long lastUpdateMs = 0;

void setup() {
  Serial.begin(115200);
  delay(200);

  Wire.begin();

  oled.begin();

  sensorA.begin();
  sensorB.begin();
  sensorC.begin();

  wifi.begin(WIFI_SSID, WIFI_PASS);
  fb.begin(FIREBASE_DEVICE_ID);
  ota.begin(OTA_HOSTNAME, OTA_PASSWORD);

  oled.printText("Inicializado!", TextPos::MIDDLE_LEFT);
  delay(2000);
}

void loop() {
  wifi.loop();
  fb.loop(wifi.isConnected());
  ota.handle(wifi.isConnected());
  oled.update();

  static float distA = NAN, distB = NAN, distC = NAN;

  unsigned long now = millis();

  if (now - lastUpdateMs >= DISPLAY_INTERVAL_MS) {
    oled.clear();
    distA = sensorA.readCm(ULTRA_SAMPLES, ULTRA_SAMPLE_INTERVAL_MS);
    delay(INTER_SENSOR_DELAY_MS);
    distB = sensorB.readCm(ULTRA_SAMPLES, ULTRA_SAMPLE_INTERVAL_MS);
    delay(INTER_SENSOR_DELAY_MS);
    distC = sensorC.readCm(ULTRA_SAMPLES, ULTRA_SAMPLE_INTERVAL_MS);
    delay(INTER_SENSOR_DELAY_MS);

    String l1 = "A: ";
    if (isnan(distA)) l1 += "--.- cm";
    else l1 += String(distA, 1) + " cm";

    String l2 = "B: ";
    if (isnan(distB)) l2 += "--.- cm";
    else l2 += String(distB, 1) + " cm";

    String l3 = "C: ";
    if (isnan(distC)) l3 += "--.- cm";
    else l3 += String(distC, 1) + " cm";

    oled.printText(l1, TextPos::TOP_LEFT);
    oled.printText(l2, TextPos::MIDDLE_LEFT);
    oled.printText(l3, TextPos::BOTTOM_LEFT);

    if (!isnan(distA) && !isnan(distB) && !isnan(distC)) fb.sendValues(((distA + distC) / 2), (distB < 5.0));

    lastUpdateMs = now;
    delay(1000);
  }
}

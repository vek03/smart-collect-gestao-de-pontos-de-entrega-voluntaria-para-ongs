#include <Arduino.h>
#include <Wire.h>
#include "Config.h"
#include "WifiManagerSC.h"
#include "FirebaseRealtime.h"
#include "OTAHandler.h"
#include "UltrasonicSensor.h"
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <stdint.h>

OledDisplay oled(OLED_SCREEN_WIDTH, OLED_SCREEN_HEIGHT, OLED_RESET);
WifiManagerSC wifi(oled, HOTSPOT_SSID, HOTSPOT_PASS);
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

  wifi.begin();
  fb.begin(FIREBASE_DEVICE_ID);
  ota.begin(OTA_HOSTNAME, OTA_PASSWORD);

  delay(200);
  oled.clear();
  oled.update();
  delay(200);

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
    oled.update();
    distA = sensorA.readCm(ULTRA_SAMPLES, ULTRA_SAMPLE_INTERVAL_MS);
    delay(INTER_SENSOR_DELAY_MS);
    distB = sensorB.readCm(ULTRA_SAMPLES, ULTRA_SAMPLE_INTERVAL_MS);
    delay(INTER_SENSOR_DELAY_MS);
    distC = sensorC.readCm(ULTRA_SAMPLES, ULTRA_SAMPLE_INTERVAL_MS);
    delay(INTER_SENSOR_DELAY_MS);

    String sensorValues = "A ";
    if (isnan(distA)) sensorValues += "--";
    else sensorValues += String(distA, 0);

    sensorValues += " B ";
    if (isnan(distB)) sensorValues += "--";
    else sensorValues += String(distB, 0);

    sensorValues += " C ";
    if (isnan(distC)) sensorValues += "--";
    else sensorValues += String(distC, 0);

    oled.printText(sensorValues, TextPos::BOTTOM_LEFT);

    if (!isnan(distA) && !isnan(distB) && !isnan(distC)) {
      float averageCm = calculateAverageCm(distA, distB, distC);
      float fillPercentage = calculatePercentage(averageCm, HEIGHT_SMARTCOLLECT_IN_CENTIMETERS);
      bool isFull = distB < CENTIMETERS_TOP_FULL || fillPercentage == 100;
      
      if(isFull && fillPercentage != 100) {
        fillPercentage = 100;
      }

      oled.printText(String(fillPercentage, 0) + "%", TextPos::TOP_LEFT, 5);
      fb.setAverageCm(averageCm);
      fb.setFillPercentage(fillPercentage);
      fb.setIsFull(isFull);
    }

    fb.setErrors(isnan(distA), isnan(distB), isnan(distC));
    fb.sendJson();
    lastUpdateMs = now;
    delay(1000);
  }
}

float calculateAverageCm(float valor1, float valor2, float valor3) {
  if(valor1 < 25) {
    valor1 = valor2;
  }

  if(valor3 < 25) {
    valor3 = valor2;
  }

  float sum = valor1 + valor2 + valor3;

  if (sum == 0) return 0;
  return sum / 3;
}

float calculatePercentage(float fill, float height) {
  if (fill == 0 || height == 0) return 0;

  float percentage = (fill / height) * 100;
  
  if (percentage > 99.5) return 100;
  else return percentage;
}
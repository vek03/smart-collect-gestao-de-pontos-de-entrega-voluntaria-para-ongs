#include <Arduino.h>
#include <Wire.h>
#include "Config.h"
#include "WifiManager.h"
#include "FirebaseRealtime.h"
#include "OTAHandler.h"
#include "UltrasonicSensor.h"
#include "LcdDisplay.h"

WifiManager wifi;
FirebaseRealtime fb(FIREBASE_REFERENCE_URL, FIREBASE_AUTH_TOKEN);
OTAHandler ota;
UltrasonicSensor sensorA(TRIG_A, ECHO_A, PULSE_TIMEOUT_US);
UltrasonicSensor sensorB(TRIG_B, ECHO_B, PULSE_TIMEOUT_US);
UltrasonicSensor sensorC(TRIG_C, ECHO_C, PULSE_TIMEOUT_US);
LcdDisplay lcd(LCD_I2C_ADDR, LCD_COLS, LCD_ROWS);

unsigned long lastUpdateMs = 0;
const unsigned long DISPLAY_INTERVAL_MS = 250;

void setup() {
  Serial.begin(115200);
  delay(200);

  // I2C
  Wire.begin();

  // LCD
  lcd.begin();
  lcd.printLine(0, "Inicializando...");
  lcd.printLine(1, "Aguarde");

  // Sensores
  sensorA.begin();
  sensorB.begin();
  sensorC.begin();

  // WiFi + OTA
  wifi.begin(WIFI_SSID, WIFI_PASS);
  ota.begin(OTA_HOSTNAME);
  fb.begin(FIREBASE_DEVICE_ID);

  lcd.printLine(0, "WiFi: " + String(wifi.isConnected() ? "OK" : "…"));
  lcd.printLine(1, "OTA pronto");
  delay(1000);
}

void loop() {
  // OTA sempre rodando
  ota.handle();
  wifi.loop();

  // Faz leituras com mitigação de crosstalk: lê A -> espera -> lê B
  static float distA = NAN, distB = NAN, distC = NAN;

  // atualiza display de tempos em tempos
  unsigned long now = millis();
  if (now - lastUpdateMs >= DISPLAY_INTERVAL_MS) {
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

    lcd.printLine(0, l1);
    lcd.printLine(1, l2);

    delay(1000);

    lcd.clear();
    lcd.printLine(0, l3);

    delay(1000);

    if (!isnan(distA) && !isnan(distB) && !isnan(distC)) fb.sendValues(((distA + distC) / 2), (distB < 5.0));

    lastUpdateMs = now;
  }
}

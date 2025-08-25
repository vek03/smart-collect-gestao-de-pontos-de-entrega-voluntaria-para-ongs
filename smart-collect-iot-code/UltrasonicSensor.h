#pragma once
#include <Arduino.h>

class UltrasonicSensor {
public:
  UltrasonicSensor(int trigPin, int echoPin, unsigned long timeoutUs = 30000UL);
  void begin();
  float readCm(int samples = 5, int sampleIntervalMs = 10);

private:
  int _trig, _echo;
  unsigned long _timeoutUs;

  unsigned long measureEchoUs();
  void triggerPulse();
};

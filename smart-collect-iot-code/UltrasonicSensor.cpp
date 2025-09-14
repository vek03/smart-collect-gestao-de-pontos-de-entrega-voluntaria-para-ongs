#include "UltrasonicSensor.h"

UltrasonicSensor::UltrasonicSensor(int trigPin, int echoPin, unsigned long timeoutUs)
: _trig(trigPin), _echo(echoPin), _timeoutUs(timeoutUs) {}

void UltrasonicSensor::begin() {
  pinMode(_trig, OUTPUT);
  pinMode(_echo, INPUT);
  digitalWrite(_trig, LOW);
}

void UltrasonicSensor::triggerPulse() {
  digitalWrite(_trig, LOW);
  delayMicroseconds(2);
  digitalWrite(_trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(_trig, LOW);
}

unsigned long UltrasonicSensor::measureEchoUs() {
  triggerPulse();
  return pulseIn(_echo, HIGH, _timeoutUs);
}

float UltrasonicSensor::readCm(int samples, int sampleIntervalMs) {
  long validCount = 0;
  double acc = 0.0;

  for (int i = 0; i < samples; ++i) {
    unsigned long duration = measureEchoUs(); 
    if (duration > 0) {
      double cm = (duration * 0.0343) / 2.0;
      acc += cm;
      validCount++;
    }
    delay(sampleIntervalMs);
  }

  if (validCount == 0) return NAN;
  return acc / validCount;
}

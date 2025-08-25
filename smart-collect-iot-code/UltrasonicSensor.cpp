#include "UltrasonicSensor.h"

UltrasonicSensor::UltrasonicSensor(int trigPin, int echoPin, unsigned long timeoutUs)
: _trig(trigPin), _echo(echoPin), _timeoutUs(timeoutUs) {}

void UltrasonicSensor::begin() {
  pinMode(_trig, OUTPUT);
  pinMode(_echo, INPUT);
  digitalWrite(_trig, LOW);
}

void UltrasonicSensor::triggerPulse() {
  // pulso de 10us no TRIG
  digitalWrite(_trig, LOW);
  delayMicroseconds(2);
  digitalWrite(_trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(_trig, LOW);
}

unsigned long UltrasonicSensor::measureEchoUs() {
  triggerPulse();
  // mede HIGH em ECHO; retorna 0 se timeout
  return pulseIn(_echo, HIGH, _timeoutUs);
}

float UltrasonicSensor::readCm(int samples, int sampleIntervalMs) {
  // média simples com descarte de zeros (timeouts)
  long validCount = 0;
  double acc = 0.0;

  for (int i = 0; i < samples; ++i) {
    unsigned long duration = measureEchoUs(); // micros
    if (duration > 0) {
      // velocidade do som ~ 343m/s -> 0.0343 cm/us; divide por 2 (ida e volta)
      double cm = (duration * 0.0343) / 2.0;
      acc += cm;
      validCount++;
    }
    delay(sampleIntervalMs);
  }

  if (validCount == 0) return NAN;
  return acc / validCount;
}

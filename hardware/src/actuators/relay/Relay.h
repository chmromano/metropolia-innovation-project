#ifndef Relay_h
#define Relay_h

#include <Arduino.h>

class Relay
{
  public:
    Relay(int pump1Pin, int pump2Pin, int pump3Pin, int pump4Pin);
    bool activatePump(int pin, int ms);

  private:
    int m_pumpControlPins[4];
};

#endif

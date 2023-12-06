#ifndef TemperatureSensor_h
#define TemperatureSensor_h

#include <Arduino.h>

class TemperatureSensor
{
  public:
    TemperatureSensor(int analogPin, int bValue = 4275, int res = 100000);

    bool readTemperature();
    float getTemperature();

  private:
    int m_analogPin; // The analog pin that the sensor is connected to
    int m_bValue;    // B value of thermistor, default is 4275
    int m_res;       // Value of R0. Default is 100k

    float m_currentTemperature; // Storing the temperature value
};

#endif

#ifndef DistanceSensor_h
#define DistanceSensor_h

#include <Arduino.h>
#include "Ultrasonic.h"

class DistanceSensor {
public:
    DistanceSensor(int digitalPin);

    void whoAmI();

    bool readDistance();
    long getDistance();

private:
    Ultrasonic m_ultraSonic;    // Instance of provided Ultrasonic class
    int m_digitalPin;           // The digital pin that the sensor is connected to

    long m_rangeInCm;           // Storing the distance value
};

#endif

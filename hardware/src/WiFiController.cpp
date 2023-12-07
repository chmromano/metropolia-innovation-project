#include "WiFiController.h"

WiFiController::WiFiController()
{
}

bool WiFiController::connectToNetwork(char *ssid, char *pass)
{
    int attemptCounter = 0;
    while (this->m_connectionStatus != WL_CONNECTED)
    {
        Serial.print("Attempting to connect. Attempt number: ");
        Serial.println(attemptCounter + 1);

        if (attemptCounter < 10)
        {
            attemptCounter++;

            // Connect to network
            this->m_connectionStatus = WiFi.begin(ssid, pass);

            // Wait for 10 seconds for connection
            delay(10000);
        }
        else
        {
            Serial.print("After ");
            Serial.print(attemptCounter);
            Serial.println(" attempts, no WiFi connection was established.");
            continue;
        }
    }

    if (this->m_connectionStatus == WL_CONNECTED)
    {
        Serial.print("IP address: ");
        Serial.println(WiFi.localIP());
        return true;
    }
    else
    {
        return false;
    }
}

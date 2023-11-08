#include "WiFiController.h"

WiFiController::WiFiController()
{
    this->m_ssid = SECRET_SSID; // Needs to be defined in wifi_secrets.h
    this->m_pass = SECRET_PASS; // Needs to be defined in wifi_secrets.h
}

void WiFiController::printSSID()
{
    Serial.println(this->m_ssid);
}

bool WiFiController::connectToNetwork()
{
    int attemptCounter = 0;

    while (this->m_connectionStatus != WL_CONNECTED)
    {
        Serial.print("Attempting to connect. Attempt number: ");
        Serial.println(attemptCounter);

        if (attemptCounter < 5)
        {
            attemptCounter++;

            Serial.print("Trying to connect to network: ");
            Serial.println(this->m_ssid);

            // Connect to network
            this->m_connectionStatus = WiFi.begin(this->m_ssid, this->m_pass);

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

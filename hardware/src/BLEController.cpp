#include "BLEController.h"

BLEController::BLEController()
{
    this->generateUniqueID();
}

void BLEController::advertiseServiceAndPair(const char *bleName)
{
    BLEService deviceSetupService("EB2269B7-F5E0-4A5E-B480-765CCB24649D");
    BLEStringCharacteristic supportedPlantsCharacteristic("B12AB6EA-1785-4F08-B194-0B0AA343605C", BLERead, 48);
    BLEStringCharacteristic uniqueIdCharacteristic("9DEC44C4-C21F-4D8F-9CC9-26E21C6F136B", BLERead, 48);
    BLEStringCharacteristic tokenCharacteristic("49A5280A-FF31-42D2-A56A-EF1940EB5C7D", BLERead | BLEWrite, 1024);
    BLEStringCharacteristic ssidCharacteristic("54CF0E15-424B-4DB3-8B8D-AC2F2A4E4E13", BLERead | BLEWrite, 96);
    BLEStringCharacteristic passwordCharacteristic("F1DB5367-EBFD-447C-A85C-2135AFD18A27", BLERead | BLEWrite, 96);

    // Initialize ArduinoBLE Library
    if (!BLE.begin())
    {
        while (1)
            ;
    }

    BLE.setLocalName(bleName);
    BLE.setAdvertisedService(deviceSetupService);

    deviceSetupService.addCharacteristic(uniqueIdCharacteristic);
    deviceSetupService.addCharacteristic(tokenCharacteristic);
    deviceSetupService.addCharacteristic(supportedPlantsCharacteristic);
    deviceSetupService.addCharacteristic(ssidCharacteristic);
    deviceSetupService.addCharacteristic(passwordCharacteristic);
    BLE.addService(deviceSetupService);

    String uniqueID = this->getUniqueID();
    char unID[32];
    uniqueID.toCharArray(unID, 32);

    uniqueIdCharacteristic.writeValue(unID);
    supportedPlantsCharacteristic.writeValue("4");

    BLE.advertise();

    while (true)
    {
        BLEDevice central = BLE.central();
        if (central)
        {
            Serial.println("Bluetooth device connected.");

            bool tokenReceived = false;
            bool ssidReceived = false;
            bool passwordReceived = false;

            while (central.connected())
            {

                if (tokenCharacteristic.written())
                {
                    Serial.print("tokenCharacteristic written: ");
                    String recToken = tokenCharacteristic.value();
                    Serial.println(recToken);
                    this->m_receivedToken = recToken;
                    tokenReceived = true;
                }

                if (ssidCharacteristic.written())
                {
                    Serial.print("ssidCharacteristic written: ");
                    String recSsid = ssidCharacteristic.value();
                    Serial.println(recSsid);
                    this->m_receivedWiFiSSID = recSsid;
                    ssidReceived = true;
                }

                if (passwordCharacteristic.written())
                {
                    Serial.print("passwordCharacteristic written: ");
                    String recPw = passwordCharacteristic.value();
                    Serial.println(recPw);
                    this->m_receivedWiFiPassword = recPw;
                    passwordReceived = true;
                }

                // Everything received, return from function
                if (tokenReceived && ssidReceived && passwordReceived)
                {
                    delay(500);
                    BLE.stopAdvertise();
                    return;
                }
            }
        }
    }
}

void BLEController::generateUniqueID()
{
    String uniqueIDString = "";
    String IDString = "";

    for (size_t i = 0; i < UniqueIDsize; i++)
    {
        if (UniqueID[i] < 0x10)
        {
            uniqueIDString += "0";
        }
        uniqueIDString += String(UniqueID[i], HEX);
    }

    this->m_uniqueID = uniqueIDString;
}

String BLEController::getUniqueID()
{
    return this->m_uniqueID;
}

String BLEController::getReceivedToken()
{
    return this->m_receivedToken;
}

String BLEController::getReceivedWiFiSSID()
{
    return this->m_receivedWiFiSSID;
}

String BLEController::getReceivedWiFiPassword()
{
    return this->m_receivedWiFiPassword;
}

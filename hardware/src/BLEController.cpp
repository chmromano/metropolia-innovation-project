#include "BLEController.h"

BLEController::BLEController()
{
    this->generateUniqueID();
}

void BLEController::advertiseServiceWithCharacteristics(const char *bleName)
{
    // BLEService deviceSetupService("EB2269B7-F5E0-4A5E-B480-765CCB24649D");
    // BLECharacteristic uniqueIdCharacteristic("9DEC44C4-C21F-4D8F-9CC9-26E21C6F136B", BLERead, 48);
    // BLECharacteristic tokenCharacteristic("49A5280A-FF31-42D2-A56A-EF1940EB5C7D", BLERead | BLEWrite, 96);
    // BLECharacteristic ssidCharacteristic("54CF0E15-424B-4DB3-8B8D-AC2F2A4E4E13", BLERead | BLEWrite, 96);
    // BLECharacteristic passwordCharacteristic("F1DB5367-EBFD-447C-A85C-2135AFD18A27", BLERead | BLEWrite, 96);

    this->m_deviceSetupService = BLEService("EB2269B7-F5E0-4A5E-B480-765CCB24649D");
    this->m_uniqueIdCharacteristic = BLEStringCharacteristic("9DEC44C4-C21F-4D8F-9CC9-26E21C6F136B", BLERead, 48);
    this->m_tokenCharacteristic =
        BLEStringCharacteristic("49A5280A-FF31-42D2-A56A-EF1940EB5C7D", BLERead | BLEWrite, 96);
    this->m_ssidCharacteristic =
        BLEStringCharacteristic("54CF0E15-424B-4DB3-8B8D-AC2F2A4E4E13", BLERead | BLEWrite, 96);
    this->m_passwordCharacteristic =
        BLEStringCharacteristic("F1DB5367-EBFD-447C-A85C-2135AFD18A27", BLERead | BLEWrite, 96);

    // Initialize ArduinoBLE Library
    if (!BLE.begin())
    {
        while (1)
            ;
    }

    BLE.setLocalName(bleName);
    BLE.setAdvertisedService(this->m_deviceSetupService);

    this->m_deviceSetupService.addCharacteristic(this->m_uniqueIdCharacteristic);
    this->m_deviceSetupService.addCharacteristic(this->m_tokenCharacteristic);
    this->m_deviceSetupService.addCharacteristic(this->m_ssidCharacteristic);
    this->m_deviceSetupService.addCharacteristic(this->m_passwordCharacteristic);

    this->m_uniqueIdCharacteristic.writeValue(this->m_uniqueID.c_str());

    BLE.advertise();
}

void BLEController::pairWithMobileApp()
{
    BLEDevice central = BLE.central();

    if (central)
    {
        while (central.connected())
        {
            // First wait for token
            while (true)
            {
                if (this->m_tokenCharacteristic.written())
                {
                    // Token received
                    const unsigned char *rec = this->m_tokenCharacteristic.value();
                    String receivedToken(reinterpret_cast<const char *>(rec));
                    Serial.print("Received token: ");
                    Serial.println(receivedToken);

                    this->m_receivedToken = receivedToken;
                    break;
                }
            }
            // Then wait for SSID
            while (true)
            {
                if (this->m_ssidCharacteristic.written())
                {
                    // SSID received
                    const unsigned char *rec = this->m_ssidCharacteristic.value();
                    String receivedSSID(reinterpret_cast<const char *>(rec));
                    Serial.print("Received SSID: ");
                    Serial.println(receivedSSID);

                    this->m_receivedWiFiSSID = receivedSSID;
                    break;
                }
            }
            // Then wait for password
            while (true)
            {
                if (this->m_passwordCharacteristic.written())
                {
                    // Password received
                    const unsigned char *rec = this->m_passwordCharacteristic.value();
                    String receivedPassword(reinterpret_cast<const char *>(rec));
                    Serial.print("Received password: ");
                    Serial.println(receivedPassword);

                    this->m_receivedWiFiPassword = receivedPassword;
                    break;
                }
            }
            // Everything received
            break;
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

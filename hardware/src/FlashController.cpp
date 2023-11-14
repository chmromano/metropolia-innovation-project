#include "FlashController.h"

typedef struct
{
    bool valid;
    char wifi_ssid[32];
    char wifi_password[32];
    char id_token[64];
} DeviceCredentials;

// Reserve a portion of flash memory to store a 'DeviceCredentials'.
// Call it 'deviceCredentialsStorage'
FlashStorage(deviceCredentialsStorage, DeviceCredentials);

FlashController::FlashController()
{
}

bool FlashController::writeToFlash()
{
    DeviceCredentials deviceCredentials;

    String wifiPASSWORD = this->m_wifiPASSWORD;
    String wifiSSID = this->m_wifiSSID;
    String token = this->m_TOKEN;

    wifiPASSWORD.toCharArray(deviceCredentials.wifi_password, 32);
    wifiSSID.toCharArray(deviceCredentials.wifi_ssid, 32);
    token.toCharArray(deviceCredentials.id_token, 64);
    deviceCredentials.valid = true;

    Serial.println("Accessing Flash. Write.");
    deviceCredentialsStorage.write(deviceCredentials);

    // Currently always returns true. Some way of verifying the
    // write operation needs to be implemented. FlashStorage.h
    // write() function has no return value.
    return true;
}

bool FlashController::readFromFlash()
{
    DeviceCredentials deviceCredentials;

    Serial.println("Accessing Flash. Read.");
    deviceCredentials = deviceCredentialsStorage.read();

    // If there is nothing to be read, "valid" should be "false".
    if (deviceCredentials.valid == false)
    {
        return false;
    }
    else
    {
        String ssid = deviceCredentials.wifi_ssid;
        ssid.toCharArray(this->m_wifiSSID, 32);

        String password = deviceCredentials.wifi_password;
        password.toCharArray(this->m_wifiPASSWORD, 32);

        String token = deviceCredentials.id_token;
        token.toCharArray(this->m_TOKEN, 64);

        return true;
    }
}

bool FlashController::clearFlash()
{
    // Overwrite the existing Device Credentials saved in
    // "deviceCredentialsStorage" with an empty DeviceCredentials.
    FlashStorage(deviceCredentialsStorage, DeviceCredentials);

    return true;
}

void FlashController::setSSID(String ssid)
{
    ssid.toCharArray(this->m_wifiSSID, 32);
}

String FlashController::getSSID()
{
    return this->m_wifiSSID;
}

void FlashController::setPASSWORD(String password)
{
    password.toCharArray(this->m_wifiPASSWORD, 32);
}

String FlashController::getPASSWORD()
{
    return this->m_wifiPASSWORD;
}

void FlashController::setTOKEN(String token)
{
    token.toCharArray(this->m_TOKEN, 64);
}

String FlashController::getTOKEN()
{
    return this->m_TOKEN;
}

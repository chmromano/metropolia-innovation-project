#include "FlashController.h"

typedef struct
{
    bool valid;
    char wifi_ssid[32];
    char wifi_password[32];
    char id_token[1024];
} DeviceCredentials;

// For plantlist. Not tested.
typedef struct
{
    bool valid;
    PlantInfo *plantList;
} WateringInfo;

// Reserve a portion of flash memory to store a 'DeviceCredentials'.
// Call it 'deviceCredentialsStorage'
FlashStorage(deviceCredentialsStorage, DeviceCredentials);

// Reserve a portion of flash memory to store a 'WateringInfo'.
// Call it 'wateringInfoStorage'
// For plantlist. Not tested.
FlashStorage(wateringInfoStorage, WateringInfo);

FlashController::FlashController()
{
}

bool FlashController::writeCredentialsToFlash()
{
    DeviceCredentials deviceCredentials;

    String wifiPASSWORD = this->m_wifiPASSWORD;
    String wifiSSID = this->m_wifiSSID;
    String token = this->m_TOKEN;

    wifiPASSWORD.toCharArray(deviceCredentials.wifi_password, 32);
    wifiSSID.toCharArray(deviceCredentials.wifi_ssid, 32);
    token.toCharArray(deviceCredentials.id_token, 1024);
    deviceCredentials.valid = true;

    Serial.println("Accessing Flash. Write.");
    deviceCredentialsStorage.write(deviceCredentials);

    // Currently always returns true. Some way of verifying the
    // write operation needs to be implemented. FlashStorage.h
    // write() function has no return value.
    return true;
}

bool FlashController::readCredentialsFromFlash()
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
        token.toCharArray(this->m_TOKEN, 1024);

        return true;
    }
}

// Not tested.
bool FlashController::writePlantListToFlash()
{
    WateringInfo wateringInfo;

    wateringInfo.valid = true;
    wateringInfo.plantList = this->m_plantList;

    Serial.println("Accessing flash. Writing PlantList.");
    wateringInfoStorage.write(wateringInfo);
}

// Not tested.
bool FlashController::readPlantListFromFlash()
{
    WateringInfo wateringInfo;

    Serial.println("Accessing flash. Reading PlantList");
    wateringInfo = wateringInfoStorage.read();

    if (wateringInfo.valid == false)
    {
        // List was invalid, e.g. nothing has been written to it
        return false;
    }
    else
    {
        PlantInfo *plantList = wateringInfo.plantList;
        this->m_plantList = plantList;

        return true;
    }
}

bool FlashController::clearFlash()
{
    // Overwrite the existing Device Credentials saved in
    // "deviceCredentialsStorage" with an empty DeviceCredentials.
    FlashStorage(deviceCredentialsStorage, DeviceCredentials);

    // Overwrite the existing Watering Info saved in
    // "wateringInfoStorage" with an empty WateringInfo.
    // Not tested.
    FlashStorage(wateringInfoStorage, WateringInfo);

    return true;
}

void FlashController::setSSID(String ssid)
{
    ssid.toCharArray(this->m_wifiSSID, 32);
}

char *FlashController::getSSID()
{
    return this->m_wifiSSID;
}

void FlashController::setPASSWORD(String password)
{
    password.toCharArray(this->m_wifiPASSWORD, 32);
}

char *FlashController::getPASSWORD()
{
    return this->m_wifiPASSWORD;
}

void FlashController::setTOKEN(String token)
{
    token.toCharArray(this->m_TOKEN, 1024);
}

char *FlashController::getTOKEN()
{
    return this->m_TOKEN;
}

// For plantlist. Not tested.
void FlashController::setPlantList(PlantInfo *plantList)
{
    this->m_plantList = plantList;
}

// For plantlist. Not tested.
PlantInfo *FlashController::getPlantList()
{
    return this->m_plantList;
}

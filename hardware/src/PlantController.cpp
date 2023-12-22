#include "PlantController.h"

PlantController::PlantController() : m_pumpController(1, 2, 3, 4)
{
    initArray();
}

void PlantController::initArray()
{
    for (int i = 0; i < 4; i++)
    {
        this->m_plants[i].watering = false;
        this->m_plants[i].plantIndex = i;
        this->m_plants[i].wateringThreshold = 0;
        this->m_plants[i].currentMoisture = 0;
    }
}
/*
void PlantController::enableWatering(int index)
{
    // Implement checking that something exists at that index
    this->m_plants[index].watering = true;

    Serial.print("Enabled watering for plant at index ");
    Serial.println(index);
}

void PlantController::disableWatering(int index)
{
    // Implement checking that something exists at that index
    this->m_plants[index].watering = false;

    Serial.print("Disabled watering for plant at index ");
    Serial.println(index);
}
*/

void PlantController::setThreshold(int index, int threshold)
{
    // Check that index is valid
    if (index >= 0 && index < 4)
    {
        this->m_plants[index].wateringThreshold = threshold;

        // Enable watering
        this->m_plants[index].watering = true;

        Serial.print("***** Threshold of plant at index ");
        Serial.print(index);
        Serial.print(" set to ");
        Serial.print(threshold);
        Serial.println(". *****");

        if (threshold == 0)
        {
            // Change the state of the plant to not be watered.
            this->m_plants[index].watering = false;
            Serial.println("Disabled watering for this plant.");
        }
    }
    else
    {
        Serial.println("Invalid index.");
    }
}

void PlantController::waterWhenNeeded(int moistures[4])
{
    for (int i = 0; i < 4; i++)
    {
        this->m_plants[i].currentMoisture = moistures[i];

        if (this->m_plants[i].watering)
        {
            if (this->m_plants[i].currentMoisture < this->m_plants[i].wateringThreshold)
            {
                Serial.print("Threshold for plant at index ");
                Serial.print(i);
                Serial.print(" is ");
                Serial.println(this->m_plants[i].wateringThreshold);

                Serial.print("Current moisture for plant at index ");
                Serial.print(i);
                Serial.print(" is ");
                Serial.println(this->m_plants[i].currentMoisture);

                Serial.print("Therefore watering plant at index: ");
                Serial.println(i);
                this->m_pumpController.activatePump(i + 1, 2000);
            }
        }
    }
}

void PlantController::activatePump(int index)
{
    this->m_pumpController.activatePump(index + 1, 2000);
}

void PlantController::printArray()
{
    for (int i = 0; i < 4; i++)
    {
        PlantInfo plant = this->m_plants[i];

        Serial.print("Plant index: ");
        Serial.print(plant.plantIndex);
        Serial.print(". Watering: ");
        Serial.print(plant.watering);
        Serial.print(". Watering threshold: ");
        Serial.print(plant.wateringThreshold);
        Serial.print(". Current moisture: ");
        Serial.println(plant.currentMoisture);
    }
}

PlantInfo *PlantController::getPlantList()
{
    return this->m_plants;
}

void PlantController::setPlantList(PlantInfo plantList[4])
{
    for (int i = 0; i < 4; i++)
    {
        this->m_plants[i] = plantList[i];
    }
}

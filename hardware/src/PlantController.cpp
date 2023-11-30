#include "PlantController.h"

PlantController::PlantController() : m_pumpController(0, 1, 2, 3)
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

void PlantController::setThreshold(int index, int threshold)
{
    if (index >= 0 && index < 4)
    {
        // Index is valid
        this->m_plants[index].wateringThreshold = threshold;

        Serial.print("Threshold of plant at index ");
        Serial.print(index);
        Serial.print(" set to ");
        Serial.println(threshold);

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
        if (this->m_plants[i].watering)
        {
            this->m_plants[i].currentMoisture = moistures[i];

            if (this->m_plants[i].currentMoisture < this->m_plants[i].wateringThreshold)
            {
                Serial.print("Watering plant at index: ");
                Serial.println(i);
                this->m_pumpController.activatePump(i, 2000);
            }
        }
    }
}

void PlantController::activatePump(int index)
{
    this->m_pumpController.activatePump(index, 2000);
}

void PlantController::printArray()
{
    for (int i = 0; i < 4; i++)
    {
        PlantInfo plant = this->m_plants[i];
        Serial.print("Printing plant at index: ");
        Serial.println(i);

        Serial.print("Watering: ");
        Serial.println(plant.watering);
        Serial.print("Watering threshold: ");
        Serial.println(plant.wateringThreshold);
        Serial.print("Current moisture: ");
        Serial.println(plant.currentMoisture);
        Serial.print("Plant index: ");
        Serial.println(plant.plantIndex);
    }
}

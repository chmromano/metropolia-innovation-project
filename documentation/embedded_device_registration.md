# Registering the Embedded Device

```mermaid

sequenceDiagram
participant frontend
participant embedded device
participant backend

    Note right of frontend: The user is logged in

    frontend->>embedded device: Establish direct Wi-Fi/Bluetooth link

    activate embedded device

    embedded device-->>frontend: Send unique identifier (Arduino serial no.)

    deactivate embedded device

    activate frontend

    frontend-->>backend: Send user account identifier and embedded device unique identifier

    deactivate frontend

    activate backend

    Note right of backend: Generate a secret token using<br>account and device identifiers

    backend-->>frontend: Send generated token

    deactivate backend

    activate frontend

    frontend-->>embedded device: Send token using Wi-Fi/Bluetooth

    Note over embedded device: Save token to flash

    frontend-->>embedded device: Send user's Wi-Fi password

    deactivate frontend

    Note over embedded device: Save Wi-Fi password to flash

    Note over embedded device: Turn off Wi-Fi/Bluetooth AP

    Note over embedded device: Connect to the user's Wi-Fi



```

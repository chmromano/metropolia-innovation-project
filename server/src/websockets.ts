import { WebSocket } from "ws";

export const websocketConnections = new Map<string, WebSocket>();

export const addWebSocketConnection = (deviceId: string, ws: WebSocket) => {
  websocketConnections.set(deviceId, ws);
};

export const removeWebSocketConnection = (deviceId: string) => {
  websocketConnections.delete(deviceId);
};

export enum MessageType {
  CHAT,
  LEAVE,
  JOIN
}
export interface MessageInterface {
  sender: string;
  content?: string;
  type: MessageType
}

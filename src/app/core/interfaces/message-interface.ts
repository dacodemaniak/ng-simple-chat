export enum MessageType {
  CHAT = 'CHAT',
  LEAVE = 'LEAVE',
  JOIN = 'JOIN'
}
export interface MessageInterface {
  sender: string;
  content?: string;
  type: MessageType
}

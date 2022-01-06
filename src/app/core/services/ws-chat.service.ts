import { Injectable } from '@angular/core';
import { StompSockService, StompSockWebSocket, WsCommand } from '@oril/ng-stomp-sock';

import { environment } from '@environment/environment';

import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageInterface } from '../interfaces/message-interface';
@Injectable({
  providedIn: 'root'
})
export class WsChatService {
  private readonly endpoint: string = `${environment.socketApiURL}/topic/public`;
  private readonly requestEndpoint: string = '/app';

  private webSocket!: StompSockWebSocket;

  constructor(
    private _websocketService: StompSockService
  ) { }

  public doConnect(): Promise<void> {
    return new Promise((resolve: any) => {
      this._websocketService.connected$
      .pipe(
        filter((connected) => !!connected)
      )
      .subscribe(() => {
        this.webSocket = this._websocketService.getWebSocket(this.endpoint);
        resolve();
      });
    });

  }

  public doDisconnect(): void {
    this._websocketService.unsubscribe(this.endpoint);
  }

  public onReceive(): Observable<any> {
    return this.webSocket.on<any>(WsCommand.MESSAGE)
  }

  public send(endpoint: string, message: MessageInterface): void {
    this.webSocket.send(`${this.requestEndpoint}/${endpoint}`, JSON.stringify(message));
  }
}

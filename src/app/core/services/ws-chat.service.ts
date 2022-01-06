import { Injectable } from '@angular/core';
import { StompSockService, StompSockWebSocket, WsCommand } from '@oril/ng-stomp-sock';

import { environment } from '@environment/environment';

import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WsChatService {
  private readonly endpoint: string = `${environment.socketApiURL}/topic/public`;
  private readonly requestEndpoint: string = '/topic';

  private webSocket!: StompSockWebSocket;

  constructor(
    private _websocketService: StompSockService
  ) { }

  public doConnect(): void {
    this._websocketService.connected$
      .pipe(
        filter((connected) => !!connected)
      )
      .subscribe(() => {
        this.webSocket = this._websocketService.getWebSocket(this.endpoint);
      });
  }

  public doDisconnect(): void {
    this._websocketService.unsubscribe(this.endpoint);
  }

  public onReceive(): Observable<any> {
    return this.webSocket.on<any>(WsCommand.MESSAGE)
  }

  public send(message: any): void {
    this.webSocket.send(this.requestEndpoint, message);
  }


}

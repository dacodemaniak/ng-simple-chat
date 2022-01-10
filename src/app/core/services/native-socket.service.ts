import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

import * as Stomp from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { MessageInterface } from '../interfaces/message-interface';

@Injectable({
  providedIn: 'root'
})
export class NativeSocketService {

  private readonly endpoint: string = `${environment.socketApiURL}`;
  private readonly requestEndpoint: string = '/app';
  private readonly channel: string = '/topic/public';

  private _socket!: WebSocket;
  private _client!: Stomp.CompatClient;

  private _isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _onReceive: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  public connect(): void {
    this._socket = new SockJS(this.endpoint);
    this._client = Stomp.Stomp.over(this._socket);

    this._client.connect({}, (frame: any) => {
      this._isConnected.next(true);
      console.log('IsConnected was updated');
      this.listen();
    });
  }

  public disconnect(): void {
    if (this._client !== null) {
      this._client.disconnect();
      this._isConnected.next(false);
    }
  }

  private listen(): Stomp.StompSubscription {
    return this._client.subscribe(this.channel, (response: any) => {
      console.log(response);
      this._onReceive.next(JSON.parse(response.body));
    })
  }

  public send(endpoint: string, message: MessageInterface): void {
    this._client.send(
      `${this.requestEndpoint}/${endpoint}`,
      {
        priority: 9
      },
      JSON.stringify(message)
    );
  }

  public get isConnected(): BehaviorSubject<boolean> {
    return this._isConnected;
  }

  public get onReceive(): BehaviorSubject<any> {
    return this._onReceive;
  }
}

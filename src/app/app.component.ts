import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import { MessageType } from './core/interfaces/message-interface';
import { NativeSocketService } from './core/services/native-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public constructor(private chatService: NativeSocketService) {}

  ngOnInit(): void {
    this.chatService.connect();
    console.log('About to subscribe to socket');

    this.chatService.isConnected.subscribe((isConnected: boolean) => {
      if (isConnected) {
        this.chatService.send('/chat.register', {
          sender: 'dacodemaniak',
          type: MessageType.JOIN
        });
  
        // Subscribe to incoming messages
        this.chatService.onReceive
          .subscribe((response: any) => {
            console.log(JSON.stringify(response));
          });
      }
    });
  }

  onMessage(message: Stomp.IMessage): void {
    console.log(JSON.parse(message.body));
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }
}

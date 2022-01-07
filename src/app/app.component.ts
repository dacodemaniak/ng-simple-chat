import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageType } from './core/interfaces/message-interface';
import { WsChatService } from './core/services/ws-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public constructor(private chatService: WsChatService) {}

  ngOnInit(): void {
    this.chatService.doConnect().then(() => {
      // Let's present to server
      this.chatService.send(
        'chat.hello',
        {
          sender: 'dacodemaniak',
          type: MessageType.CHAT
        }
      );

      // Subscribe to inbound messages
      this.chatService.onReceive().subscribe((data: any) => {
        console.log(`Receiving ${JSON.stringify(data)}`);
      })
    });

  }
  ngOnDestroy(): void {
    this.chatService.doDisconnect();
  }
}

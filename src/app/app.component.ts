import { Component, OnDestroy, OnInit } from '@angular/core';
import { WsChatService } from './core/services/ws-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public constructor(private chatService: WsChatService) {}

  ngOnInit(): void {
    this.chatService.doConnect();
  }
  ngOnDestroy(): void {
    this.chatService.doDisconnect();
  }
}

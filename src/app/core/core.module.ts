import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@environment/environment';
import { NgStompSockModule } from '@oril/ng-stomp-sock';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgStompSockModule.config({
      url: `${environment.socketApiURL}`
    })
  ]
})
export class CoreModule { }

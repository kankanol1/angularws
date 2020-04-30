import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { WebsocketComponent } from './websocket/websocket.component';
import { ListComponent } from './list/list.component';
import {Routes,RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'websocket', component: WebsocketComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    WebsocketComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

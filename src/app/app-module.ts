import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Navbar } from './components/navbar/navbar';
import { Dataservices } from './service/dataservices';

@NgModule({
  declarations: [
    App,
    Login,
    Navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  [Dataservices]

  ],
  bootstrap: [App]
})
export class AppModule { }

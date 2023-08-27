import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CapturedPlayerComponent } from './components/captured-player/captured-player.component';
import { CapturedGuildsComponent } from './components/captured-guilds/captured-guilds.component';
import { AddGuildCapturerComponent } from './dialogs/add-guild-capturer/add-guild-capturer.component';
import { AddPlayerCapturerComponent } from './dialogs/add-player-capturer/add-player-capturer.component';
import { BtnDirective } from './directives/btn.directive';

@NgModule({
  declarations: [
    AppComponent,
    CapturedPlayerComponent,
    CapturedGuildsComponent,
    AddGuildCapturerComponent,
    AddPlayerCapturerComponent,
    BtnDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { SpotComponent } from '@src/app/spot/spot.component';
import { GameComponent } from '@src/app/game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpotComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

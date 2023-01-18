import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechnicalComponent } from './technical/technical.component';

@NgModule({
  declarations: [AppComponent, TechnicalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

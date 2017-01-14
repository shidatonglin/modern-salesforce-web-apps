import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchPipe } from './search.pipe';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { StatusPipe } from './status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ContactDetailsComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

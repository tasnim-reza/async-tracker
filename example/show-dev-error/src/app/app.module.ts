import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericErrorHandler } from './shared/generic-error.handler';
import { ExampleModule } from './examples/example.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ImportedMaterialModule } from './shared/imported-material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExampleModule,
    ImportedMaterialModule
  ],
  providers: [{ provide: ErrorHandler, useClass: GenericErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }

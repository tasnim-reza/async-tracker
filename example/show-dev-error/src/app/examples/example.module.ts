import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicSetTimeoutComponent } from './basic-settimeout/basic-settimeout.component';
import { ExampleRoutes } from './example.routing';
import { ImportedMaterialModule } from '../shared/imported-material.module';
import { ExampleMenuComponent } from './shared/example-menu/example-menu.component';
import { ExampleLayoutComponent } from './example-layout/example-layout.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorClientSideComplexComponent } from './http-error-client-side-complex/http-error-client-side-complex.component';

@NgModule({
  imports: [
    HttpModule,
    RouterModule.forChild(ExampleRoutes),
    HttpClientModule,
    ImportedMaterialModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    BasicSetTimeoutComponent,
    ExampleMenuComponent,
    ExampleLayoutComponent,
    HttpErrorClientSideComplexComponent
  ],

  providers: [],
  bootstrap: []
})
export class ExampleModule {
  constructor() {
  }
}

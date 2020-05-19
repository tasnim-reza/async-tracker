import { NgModule } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatGridListModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule
  ],
  exports: [
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ImportedMaterialModule { }

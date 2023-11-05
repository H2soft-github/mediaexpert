import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductListComponent
  ],
  entryComponents: [ProductDialogComponent]
})
export class ProductsModule { }

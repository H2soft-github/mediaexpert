import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patterns} from '../../shared/utils/patterns';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../service/models/product';
import {ProductService} from '../service/product.service';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    code: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    price: new FormControl('0', [Validators.required, Validators.pattern(Patterns.Decimal)]),
  });
  public errorMsg: string | undefined;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editedProduct: Product|undefined,
              private productService: ProductService) {
    if (editedProduct !== undefined) {
      this.updateForm(editedProduct);
    }
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.form.valid) {
      // @ts-ignore
      const product = this.extractData();
      if (this.editedProduct !== undefined) {
        this.updateEditedProduct(product);
      } else {
        this.saveNewProduct(product);
      }
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  private updateForm(product: Product): void {
    this.form.patchValue({
      name: product.name,
      code: product.code,
      price: product.price.toString().replace('.', ',')
    });
  }

  private extractData(): Product {
    const product: Product = {
      id: this.editedProduct !== undefined ? this.editedProduct.id : 0,
      name: this.form.get('name')?.value,
      code: this.form.get('code')?.value,
      price: Number(this.form.get('price')?.value.replace(',', '.'))
    };
    return product;
  }

  private saveNewProduct(product: Product): void {
    this.productService.postProduct(product)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            this.errorMsg = error.error;
          }
          return throwError(this.errorMsg);
        })
      )
      .subscribe(x => {
        this.dialogRef.close(product);
      });
  }

  private updateEditedProduct(product: Product): void {
    this.productService.putProduct(product)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            this.errorMsg = error.error;
          }
          return throwError(this.errorMsg);
        })
      )
      .subscribe(x => {
        this.dialogRef.close(product);
      });
  }
}

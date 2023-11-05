import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../service/models/product';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[] = [];
  public loaded = false;
  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshProducts();
  }

  public refreshProducts(): void {
    this.productService.getProducts().subscribe(x => {
      this.products = x;
      this.loaded = true;
    });
  }

  public addNewProduct(): void {
    this.openDialog(undefined);
  }

  public editProduct(product: Product): void {
    this.openDialog(product);
  }

  public deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(x => this.refreshProducts());
  }

  private openDialog(product: Product|undefined): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = product;
    const dialog = this.dialog.open(ProductDialogComponent, dialogConfig);
    dialog.afterClosed().subscribe(x => {
      if (x != null) {
        this.refreshProducts();
    }});
  }
}

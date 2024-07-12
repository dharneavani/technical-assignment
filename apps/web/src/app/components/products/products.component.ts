import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from './../../services/DialogService/confirmation-dialog.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, AsyncPipe, DatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(
    private _service: ProductsService,
    private _router: Router,
    private confirmationDialogService: ConfirmationDialogService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this._service.findAll();
  }

  showProduct(id: string) {
    this._router.navigate(['products', id]);
  }


 
  async deleteProduct(id: string, event: Event) {

      this.confirmationDialogService.confirm(
        'Are you sure you want to delete this product?',
        () => {
          this._service.delete(id).subscribe(() => this.loadProducts())
          event.stopPropagation();

        },
        () => {
          event.stopPropagation();

        }
      );
    
    this._service.delete(id).subscribe(() => this.loadProducts())
  }
}

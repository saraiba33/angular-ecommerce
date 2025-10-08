import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CurrencyPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgForOf, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    console.log('test');
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
    });
  }
}

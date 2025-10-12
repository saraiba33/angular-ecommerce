import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [NgForOf, RouterLink, RouterLinkActive],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
})
export class ProductCategoryMenuComponent {
  constructor(private productService: ProductService) {}

  productCategories: ProductCategory[] = [];

  ngOnInit() {
    this.lisProductCategories();
  }

  lisProductCategories() {
    this.productService
      .getProductCategories()
      .subscribe((data: ProductCategory[]) => {
        this.productCategories = data;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from "../app/service/product.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Angular Super Market';

  products: any;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50, 100];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  getRequestParams(page: number, pageSize: number): any {

    //debugger

    let params: any = {};

    if (page) {
      // params[`page`] = page - 1;
      params[`PageNumber`] = page;
    }

    if (pageSize) {
      params[`PageSize`] = pageSize;
    }

    return params;
  }

  retrieveProducts(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this._productService.getAllProducts(params)
      .subscribe({
        next: (result) => {
          this.products = result.data;
          this.count = result.total;
          console.log(this.products);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProducts();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProducts();
  }

}

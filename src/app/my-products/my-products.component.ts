import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service'
@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
products: any;
  constructor(public data: DataService, public rest: RestApiService) { }

  async  ngOnInit() {
    try {
      const data = await this.rest.get(
        '/api/seller/products'
      );
      data['success']
        ? (this.products = data['products'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}

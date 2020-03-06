 import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {DataService} from '../data.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
categories: any;
newCategory = '';
btnDisabled = false;
  constructor(public data: DataService , public rest: RestApiService) { }

  async ngOnInit() {

    try {
      const data =await this.rest.get(
        '/api/categories'
      );
      data['success']
      ?(this.categories = data['categories'])
      :this.data.error(data['message']);
  }catch (error){
    this.data.error(error['message']);
  }

}
async addCategory() {
  this.btnDisabled = true;
  try{
    const data = await this.rest.post(
      '/api/categories',
      {category: this.newCategory}
    );
    data['success']
    ? this.data.success(data['message'])
    : this.data.error(data['message']);

    }catch (error){
      this.data.error(error['message']);
  }
  this.btnDisabled = false;
}
}
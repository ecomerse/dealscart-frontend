import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{DataService} from './data.service';
import * as algoliasearch from 'algoliasearch/lite';
const searchclient =algoliasearch(
  'J8U3JI0K0P' , 'b11ca69d57ef556606201b9351d9f5ad'
);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchTerm ='';
  isCollapsed = true;
  config ={
  indexName: 'dealscart',
  searchclient
  };
  constructor(public router: Router, public data: DataService){
    this.data.getProfile();
    this.data.cartItems = this.data.getCart().length;
  }

  get token(){
    return localStorage.getItem('token');
  }
  collapse(){
    this.isCollapsed = true;

  }
  closeDropdown(dropdown) {
    dropdown.close();
  }
  logout(){
  this.data.user={};
  this.data.cartItems = 0;
  localStorage.clear();
  this.router.navigate(['']);
}
  search(){
    if (this.searchTerm){
      this.collapse();
      this.router.navigate(['search', { query: this.searchTerm }]);
    }
  }
}



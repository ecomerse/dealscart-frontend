import { Component, OnInit } from '@angular/core';
import{DataService} from '../data.service';

import {RestApiService} from '../rest-api.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  btnDisabled=false;
  currentAddress: any;

  constructor(public data: DataService, public rest: RestApiService) { }

 async ngOnInit() {
   try{
     const data = await this.rest.get(
       "/api/accounts/address"
     );
     if (
       JSON.stringify(data['address'])==="{}" &&
       this.data.message ===''
      ) {
       this.data.warning(
         'You have not entered Shipping address. Please enter your shipping address.'
       );
       }
       this.currentAddress = data['address'];
   }catch (error){
     this.data.error(error['message']);

   }
  }
  async updateAddress(){
    this.btnDisabled = true;
    try{
      const res = await this.rest.post(
        '/api/accounts/address',
        this.currentAddress
      );
      res['success']
      ? (this.data.success(res['message']), await this.data.getProfile())
      : this.data.error(res['message']);
      } catch (error) {
  this.data.error(error['message']);
}
    this.btnDisabled = false;
  }

}

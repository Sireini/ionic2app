import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as $ from 'jquery';
import localForage from "localforage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    localForage.getItem('getSchema', (err, data) => {
      if(data){
        $('#myDiv').html(data);
      }
    });
  }

}

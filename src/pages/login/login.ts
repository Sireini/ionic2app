import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as $ from 'jquery';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // tokenValue: any;

  constructor(public navCtrl: NavController, public loading: LoadingController) {
    
  }

  getSchema(tokenValue){
    setTimeout(() => {
    this.navCtrl.push(TabsPage);

    $.ajax({
        type: "POST",
        url:  "http://sylvanreinieren.com/fysioWebapp/php/get_schema.php",
        data: { dataString: tokenValue },
        cache: false,
        success: function(data){
            $('#myDiv').html(data);
        }
      });
    }, 2000);
  }

  ionViewLoaded(tokenValue) {
    // Create the popup
    let loadingPopup = this.loading.create({
      content: 'Laden persoonlijk schema...'
    });

    // Show the popup
    loadingPopup.present();

    setTimeout(() => {
      loadingPopup.dismiss();
    }, 2000);

    this.getSchema(tokenValue);
  }

  // changeColor(){
  //   $('#x').text('white');
  //   console.log('test');
  // }

}

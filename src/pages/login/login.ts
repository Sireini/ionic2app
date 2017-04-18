import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
import localForage from "localforage";

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
   // Create the popup
    loadingPopup = this.loading.create({
      content: 'Laden persoonlijk schema...'
    });

  constructor(public navCtrl: NavController, public loading: LoadingController) {
     
  }

  ionViewCanEnter() {
    localForage.getItem('didLogin', (err, value) => {
      if(value){
         // Show the popup
        this.loadingPopup.present();

        setTimeout(() => {
          this.loadingPopup.dismiss();
        }, 1000);

        this.navCtrl.push(TabsPage);
      }
    });
  }

  userLogin(tokenValue) {
    // Show the popup
    this.loadingPopup.present();

    setTimeout(() => {
      this.loadingPopup.dismiss();
    }, 2000);

    localForage.setItem('didLogin', 'true').then(function (value) {
        // Do other things once the value has been saved.
        console.log(value);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });

    this.getSchema(tokenValue);
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

            localForage.setItem('getSchema', data).then(function (data) {
                // Do other things once the value has been saved.
                console.log(data);
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
        }
      });
    }, 2000);
  }
}

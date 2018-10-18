import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Util} from "../../providers/util/util";
import {User} from "../../models/user";
import {HttpProvider} from "../../providers/http/http";
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})

/**
 * @author: KMR
 * @email: yajuve.25.dz@gmail.com
 */

export class MyProfilePage {

  public Util = Util;
  private profile: User = new User();
  private isLoading: boolean = true;

  constructor(public http:HttpProvider,
     public navCtrl: NavController, 
     private userProvider:UserProvider, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.isLoading = true;
    this.profile = <User> this.userProvider.user;

  }

  doSubmit() {
    
  }

}

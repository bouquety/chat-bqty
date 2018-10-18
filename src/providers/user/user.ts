import {User} from "../../models/user";
import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {
  registerUser(account: User): any {
    throw new Error("Method not implemented.");
  }

  private _user:User = new User();
  private _status = this.statusUsers();

  constructor(private nativeStorage: Storage) {
    console.log('Hello UserProvider Provider');
    this.loginUser("jjj", "jjj").then(
      data => console.log(data)
    )
  }

  get user():User {
    return this._user;
  }

  set user(value:User) {
    this._user = value;
  }

  statusUsers(){
    this.nativeStorage.get('users')
    .then( // Tentative de récuperation de la data stocker via la key 'users'
      data => { // Tentative success - Le plugin à pu se connecter au stockage local
        if( data === null){ // Test si la data 'users' n'existe pas
          this.nativeStorage.set('users', []); // Création de la data 'users'
          return 0
        }else{ // Test si la data 'users' existe
          if(Array.isArray(data)) // Test si c'est un tableau
            return (data.length > 0)? 1 : -1;
          else{ // Test si c'est pas un tableau
            this.nativeStorage.set('users', []);
            return 0;
          }
        }
      },
      error => { // Tentative echec - Ont crée la data et ont recommence le test
        this.nativeStorage.set('users', []);
        return 0;
      }
    );
  }

  checkedEmail(email:string){
    this.nativeStorage.set('users', [{email:"jjj", password:"jjj"}]);
    return this.nativeStorage.get('users').then(
      users => {
        for(let i = 0; i < users.length; i++){ // Boucle sur les elements stocker dans la key 'users
          if(users[i].email === email) // Test si l'email = l'email entrer en parametre
            return true;
        }
        return false;
      }
    )
  }

  loginUser(email:string, password:string){
    return this.checkedEmail(email).then( // Test si l'address email est enregister
      data => {
        if(data){ // Verification du resulta de la Promise 'checkedEmail'
           return this.nativeStorage.get('users').then( // Récuperation des utilisateur
            data => {
              console.log("-----------------")
              for(let i = 0; i < data.length; i++)
                if(data[i].email === email && data[i].password === password) // Verification du password
                  return data[i]
              return false;
            })
        }
        return false
      }
    )
  }
}

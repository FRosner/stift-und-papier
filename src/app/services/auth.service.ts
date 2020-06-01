import {Injectable} from '@angular/core';
import {User} from '@src/app/models/user';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$: Observable<User>;

  constructor(
      private fireAuth: AngularFireAuth,
  ) {
    this.user$ = this.fireAuth.authState;
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    await this.fireAuth.auth.signInWithPopup(provider);
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
  }

}

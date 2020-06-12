import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {UserState} from '@src/app/models/user-state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUser = new BehaviorSubject<UserState>(UserState.loading);
  currentUser$ = this.currentUser.asObservable();

  constructor(
    public fireAuth: AngularFireAuth,
  ) {
    fireAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser.next(UserState.loggedIn(user));
      } else {
        this.currentUser.next(UserState.notLoggedIn);
      }
    });
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    await this.fireAuth.auth.signInWithPopup(provider);
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
  }

}

import {Injectable} from '@angular/core';
import {User} from '@src/app/models/user';
import {BehaviorSubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {fromNullable, Option} from 'fp-ts/es6/Option';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUser = new BehaviorSubject<Option<User> | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(
      public fireAuth: AngularFireAuth,
  ) {
    fireAuth.authState.subscribe(user =>
        this.currentUser.next(fromNullable(user)),
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    await this.fireAuth.auth.signInWithPopup(provider);
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
  }

}

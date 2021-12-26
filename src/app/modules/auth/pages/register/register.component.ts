import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { DICTIONARY } from 'src/app/helpers/dictionary.helpers';
import { ROUTERS_LIST } from 'src/app/helpers/routes.helpers';
import { authActionRegister } from 'src/app/store/actions/auth.actions';
import { selectAuthLoading } from 'src/app/store/selectors/auth.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public DICTIONARY = DICTIONARY;
  public ROUTES = ROUTERS_LIST;
  hide: boolean = true;
  hide2: boolean = true;
  public loading = this.store.select(selectAuthLoading);

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        company: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      this.checkPasswords(),
    );
  }

  checkPasswords() {
    return (group: FormGroup) => {
      let pass = group.get('password').value.trim();
      let confirmPassword = group.get('confirmPassword').value.trim();
      if (pass !== confirmPassword) {
        group.get('confirmPassword').setErrors({ NoPasswordMatch: true });
      }
      return null;
    };
  }

  onSubmit() {
    this.store.dispatch(
      authActionRegister({
        user: {
          email: this.form.get('email').value,
          password: this.form.get('password').value,
        },
        company: {
          name: this.form.get('company').value,
        },
      }),
    );
  }
}

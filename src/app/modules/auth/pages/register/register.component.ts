import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DICTIONARY } from 'src/app/helpers/dictionary.helpers';
import { ROUTERS_LIST } from 'src/app/helpers/routes.helpers';
import { authActionRegister, EAuthActions } from 'src/app/store/actions/auth.actions';
import { selectAuthLoading } from 'src/app/store/selectors/auth.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public DICTIONARY = DICTIONARY;
  public ROUTES = ROUTERS_LIST;
  hide: boolean = true;
  hide2: boolean = true;
  public loading = this.store.select(selectAuthLoading);
  constructor(private fb: FormBuilder, private store: Store<IAppState>) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      company: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value.trim();
    let confirmPassword = group.get('confirmPassword').value.trim();
    if (pass !== confirmPassword) {
      group.get('confirmPassword').setErrors({ NoPasswordMatch: true });
    }
  }

  onSubmit() {
    this.store.dispatch(authActionRegister(this.form.value));
  }

}

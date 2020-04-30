import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DICTIONARY, ROUTES } from "./../../../../helpers/helpers";
import { Store, select } from "@ngrx/store";
import { IAppState } from "./../../../../store/state/app.state";
import { authActionLogin } from "src/app/store/actions/auth.actions";
import { AuthService } from "src/app/services/auth/auth.service";
import { Observable } from "apollo-link";
import { selectAuthLoading } from "src/app/store/selectors/auth.selectors";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public DICTIONARY = DICTIONARY;
  public ROUTES = ROUTES;
  public hide = true;
  public loading = this.store.select(selectAuthLoading);

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["superadmin@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required]],
    });
  }

  onSubmit() {
    this.store.dispatch(authActionLogin(this.form.value));
  }
}

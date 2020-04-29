import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DICTIONARY, ROUTES } from "./../../../../helpers/helpers";
import { Store } from "@ngrx/store";
import { IAppState } from "./../../../../store/state/app.state";
import { authActionLogin } from "src/app/store/actions/auth.actions";
import { AuthService } from "src/app/services/auth/auth.service";
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

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.store.dispatch(authActionLogin(this.form.value));
  }
}

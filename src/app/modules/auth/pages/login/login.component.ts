import { AfterContentInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DICTIONARY } from "./../../../../helpers/dictionary.helpers";
import { ROUTERS_LIST } from "./../../../../helpers/routes.helpers";
import { Store } from "@ngrx/store";
import { IAppState } from "./../../../../store/state/app.state";
import { authActionLogin } from "src/app/store/actions/auth.actions";
import { selectAuthLoading } from "src/app/store/selectors/auth.selectors";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public DICTIONARY = DICTIONARY;
  public ROUTES = ROUTERS_LIST;
  public hide = true;
  public loading = this.store.select(selectAuthLoading);

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {
  }

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

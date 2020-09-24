import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { IAccount } from "src/app/interfaces/account";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseService {
  login(account: IAccount) {
    const query = `
    query {
      login(input: { email: "${account.email}", password: "${account.password}" }) {
        token,
        user {
          access,
          name,
          rol,
          company {
            _id,
            name
          }
        }
      }
    }
  `;
    return super.graphqlQuery(query).pipe(map((resp) => resp.data.login));
  }
}

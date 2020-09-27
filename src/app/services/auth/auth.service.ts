import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { IAccount } from "src/app/interfaces/account";
import { map } from "rxjs/operators";
import { IRegister } from 'src/app/interfaces/register.interface';

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
          name,
          rol,
          email,
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
  register(account: IRegister) {
    const query = `
      mutation {
        register(
          input: 
          {
              user: {
                rol: "SUPER ADMINISTRATOR",
                email: "${account.email}", 
                password: "${account.password}"
              }, 
              company: {
                name: "${account.company}"
              }
          }
        ) {
          token
          user {
            email
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
    return super.graphqlMutation(query).pipe(map((resp) => resp.data.register));
  }
}

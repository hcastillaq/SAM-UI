import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Apollo } from "apollo-angular";
import { Observable, EMPTY } from "rxjs";
import gql from "graphql-tag";
import { catchError } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class BaseService {
	constructor(private http$: HttpClient, private apollo: Apollo) { }

	graphqlQuery(query, variables = {}): Observable<any> {
		query = gql`
      ${query},
    `;
		return this.apollo
			.watchQuery({
				query,
				variables,
				fetchPolicy: "no-cache"
			})
			.valueChanges.pipe(catchError((resp) => EMPTY));
	}
	graphqlMutation(query, variables = {}): Observable<any> {
		query = gql`
      ${query}
    `;
		return this.apollo.mutate({
			mutation: query,
			variables,
			fetchPolicy: "no-cache"
		}).pipe(catchError((resp) => EMPTY));
	}

	get(url, params: HttpParams = new HttpParams()) {
		return this.http$.get(`${url}`, { params });
	}
	post(url, data) {
		return this.http$.post(`${url}`, data);
	}
	update(url, params: HttpParams = new HttpParams()) {
		return this.http$.put(`${url}`, { params });
	}
	delete(url, params: HttpParams = new HttpParams()) {
		return this.http$.request("DELETE", `${url}`, {
			body: params,
		});
	}
	put(url, data) {
		return this.http$.put(url, data);
	}
}

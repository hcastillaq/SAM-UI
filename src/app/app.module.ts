import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { EntityDataModule } from "@ngrx/data";
import { entityConfig } from "./store/entity/entity-metadata";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { SnackbarTemplateComponent } from "./components/snackbar-template/snackbar-template.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthEffects } from "./store/effects/auth.effects";
import { GraphQLModule } from "./graphql.module";
import { HttpTokenInterceptor } from "./interceptors/token.interceptor";

@NgModule({
  declarations: [AppComponent, SnackbarComponent, SnackbarTemplateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    GraphQLModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent, SnackbarTemplateComponent],
})
export class AppModule {}

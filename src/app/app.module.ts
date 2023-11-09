import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListingComponent } from './component/user-listing/user-listing.component';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { UserSignupComponent } from './component/user-signup/user-signup.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MaterialModule } from './material.module';
import { SetTokenInterceptor } from './service/auth-interceptor/set-token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { UserEffects } from './store/user/user.effects';
import { UserReducer } from './store/user/user.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppEffects } from './common/common.effects';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { StorageService } from './service/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListingComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserHomeComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({'user':UserReducer}),
    EffectsModule.forRoot([UserEffects, AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS, useClass: SetTokenInterceptor, multi: true
    },
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

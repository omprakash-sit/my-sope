import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialsModule } from './shared';
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthServerProvider } from './shared/auth/auth-jwt.service';
import { UsersModule } from './users/users.module';
import { httpInterceptorProviders } from './core/interceptor';
import { SharedCommonModule } from './shared/shared-common.module';
import { DataCommunicationService } from './shared/services';
import { ErrorComponent } from './layout/error/error.component';
import { CustomerRecordsModule } from './customer-records/customer-records.module';
import { DataUtilityService } from './shared/services/data-utility.service';

@NgModule({ declarations: [
        AppComponent,
        ErrorComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularMaterialsModule,
        ReactiveFormsModule,
        SharedCommonModule,
        LoginModule,
        AdminModule,
        UsersModule,
        CustomerRecordsModule], providers: [
        AuthServerProvider,
        httpInterceptorProviders,
        DataCommunicationService,
        DataUtilityService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {RequestComponent} from './request/request.component';
import {MatButtonModule} from '@angular/material/button';
import {RdetailComponent} from './rdetail/rdetail.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {RegisterComponent} from './register/register.component';
import {Service} from './services/service';
import {ToastrModule} from 'ngx-toastr';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatGridListModule,
        MatDialogModule,
        MatExpansionModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            progressAnimation: 'increasing',
            preventDuplicates: true,
            positionClass: 'toast-bottom-full-width',
        })
/*        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })*/
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        RequestComponent,
        RdetailComponent,
        RegisterComponent,
        DialogComponent,

    ],
    providers: [Service, AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}

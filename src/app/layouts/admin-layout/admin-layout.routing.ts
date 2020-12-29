import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {IconsComponent} from '../../icons/icons.component';
import {RequestComponent} from '../../request/request.component';
import {RdetailComponent} from '../../rdetail/rdetail.component';
import {RegisterComponent} from '../../register/register.component';
import {AuthGuard} from '../../services/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'request', component: RequestComponent/*, canActivate: [AuthGuard]*/},
    {path: 'rdetail', component: RdetailComponent/*, canActivate: [AuthGuard]*/},
    {path: 'rdetail/:id', component: RdetailComponent/*, canActivate: [AuthGuard]*/}
];

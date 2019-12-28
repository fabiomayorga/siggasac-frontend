import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { AuthGuard } from '../helpers';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivateChild: [AuthGuard],
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Sessions', titleI18n: 'Sessions' },
      },
      {
        path: 'colegios',
        loadChildren: () => import('./schools/schools.module').then(m => m.SchoolsModule),
      },
      {
        path: 'cuentas',
        loadChildren: () => import('./billingaccounts/billingaccounts.module').then(m => m.BillingaccountsModule),
      },
      { path: 'bancos', loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule) },
      {
        path: 'terceros',
        loadChildren: () => import('./thirdparty/thirdparty.module').then(m => m.ThirdPartyModule),
      },
      {
        path: 'comprobantes',
        loadChildren: () => import('./vouchers/vouchers.module').then(m => m.VouchersModule),
      },
      { path: 'flujos', loadChildren: () => import('./revenue/revenue.module').then(m => m.RevenueModule) },
      {
        path: 'proyectos_sedes',
        loadChildren: () => import('./proyects_subsidiaries/proyects.module').then(m => m.ProyectsSubsidiariesModule),
      },
      {
        path: 'cuentas_bancarias',
        loadChildren: () => import('./bank_accounts/bankAccounts.module').then(m => m.BankAccountsModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'Register' },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {
}

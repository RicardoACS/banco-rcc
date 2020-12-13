import { WithdrawalComponent } from './view/backoffice/account/withdrawal/withdrawal.component';
import { RechargeComponent } from './view/backoffice/account/recharge/recharge.component';
import { TransfersComponent } from './view/backoffice/transfers/transfers.component';
import { DashboardComponent } from './view/backoffice/dashboard/dashboard.component';
import { LastTransactionsComponent } from './view/backoffice/account/last-transactions/last-transactions.component';
import { LoginComponent } from './view/home/login/login.component';
import { RegisterComponent } from './view/home/register/register.component';
import { HomeComponent } from './view/home/home/home.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'nuevo-cliente', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cliente/dashboard', component: DashboardComponent },
  { path: 'cliente/cuenta/ultimos-movimientos', component: LastTransactionsComponent },
  { path: 'cliente/cuenta/recargar-saldo', component: RechargeComponent },
  { path: 'cliente/cuenta/retiro-saldo', component: WithdrawalComponent },
  { path: 'cliente/transferencias', component: TransfersComponent }
  //{ path: "**", component: eerror }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  RegisterComponent,
  LoginComponent,
  DashboardComponent,
  LastTransactionsComponent,
  TransfersComponent
];

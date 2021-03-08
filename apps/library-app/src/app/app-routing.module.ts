import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MycollectionComponent } from './components/mycollection/mycollection.component';
import { BillingComponent } from './components/billing/billing.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'mycollection', component: MycollectionComponent },
  { path: 'billingdetails', component: BillingComponent },
  { path: 'bookdetail', component: BookDetailComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

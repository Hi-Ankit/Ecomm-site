import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerListProductComponent } from './seller-list-product/seller-list-product.component';
import { SellerEditProductComponent } from './seller-edit-product/seller-edit-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './auth.guard';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {path:'cart',component:CartComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'header',component:HeaderComponent},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[authGuard]},
  {path:'seller-list-product',component:SellerListProductComponent,canActivate:[authGuard]},
  {path:'seller-edit-product/:id',component:SellerEditProductComponent,canActivate:[authGuard]},
  {path:'seller-auth',component:SellerAuthComponent},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[authGuard]},
  {path:'search/:query',component:SearchComponent},
  {path:'details/:productId',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'my-order',component:MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

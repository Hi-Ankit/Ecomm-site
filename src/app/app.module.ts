import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerListProductComponent } from './seller-list-product/seller-list-product.component';
import { SellerEditProductComponent } from './seller-edit-product/seller-edit-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    CartComponent,
    HeaderComponent,
    LoginComponent,
    SellerAddProductComponent,
    SellerListProductComponent,
    SellerEditProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CheckoutComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

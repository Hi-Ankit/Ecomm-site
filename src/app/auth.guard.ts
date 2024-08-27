import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerservice= inject(SellerService);
  return sellerservice.isSellerLoggedInn;
};

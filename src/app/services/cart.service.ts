import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor() { }

private cartItems = new BehaviorSubject<any[]>([]); 
cartItems$ = this.cartItems.asObservable();

addToCart(item: any): void {
  const currentItems = this.cartItems.getValue();
  currentItems.push(item); 
  this.cartItems.next(currentItems);
}

removeItem(item: any): void {
  const currentCart = this.cartItems.getValue();
  const updatedCart = currentCart.filter(cartItem => cartItem.pdtUID !== item.pdtUID);  // Use unique identifier (like pdtUID) to find and remove
  this.cartItems.next(updatedCart);
}

getCartCount(): number {
  return this.cartItems.getValue().length; 
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule , NgbModule]
})
export class HeaderComponent implements OnInit {

  cartCount: number = 0;
  cartItems: any[] = []; 

  constructor(private router : Router , private cartService: CartService , private modalService: NgbModal) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length; // Get the updated cart count
    });
  }

  navigateTo(path:String){
    this.router.navigate(['/'+path]);
  }

  openCardModal(cardModal: any){

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items; // Update cart items list
    });
    console.log(this.cartItems);
    this.modalService.open(cardModal); // Open the modal

  }

  removeFromCart(item: any) {
    // Call your cart service to remove the item
    this.cartService.removeItem(item);
    
    // Optionally, you can log or display something to confirm the item is removed
    console.log(`Item ${item.pdtName} removed from the cart`);
  }

}

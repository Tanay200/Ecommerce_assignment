import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/restApi.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports : [CommonModule , FormsModule , NgbModule]
})
export class HomeComponent implements OnInit {

  products: any[] = [];
  filteredProducts : any [] = [];
  colors: any[] = [];

  brands: any[] = [];

  types: any[] = [];
  selectedType: string | null = null;  
  searchQuery: string = '';
  selectedProduct: any; 
  showDescription: boolean = true;

  constructor(private restApiService : RestApiService, private modalService: NgbModal , private cartService: CartService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.restApiService.getProducts().subscribe((data) => {
        this.products = data; 
        this.filteredProducts = data;
        this.getBrandFilter();
        this.getColorFilter();
        this.getTypeFilter();
      },
      (error) => {
        console.error('Error fetching products', error);  // Handle error
      }
    );
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product); // Add the product to cart
  }

  getColorFilter() {
    this.colors = [];
    this.products.forEach(product => {
      if (!this.colors.some(color => color.name === product.color)) {
        this.colors.push({ name: product.color, selected: false });
      }
    });
  }
  
  getBrandFilter() {
    this.brands = [];
    this.products.forEach(product => {
      if (!this.brands.some(brand => brand.name === product.pdtCategory)) {
        this.brands.push({ name: product.pdtCategory, selected: false });
      }
    });
  }
  
  getTypeFilter() {
    this.types = [];
    this.products.forEach(product => {
      if (!this.types.some(type => type.name === product.pdtType)) {
        this.types.push({ name: product.pdtType, selected: false });
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      
      // Filter for Color
      const matchesColor = this.colors.some(color => color.selected && product.color === color.name);
  
      // Filter for Brand (Matching pdtCategory with selected brand)
      const matchesBrand = this.brands.some(brand => brand.selected && product.pdtCategory === brand.name);
  
      // Filter for Type (matching pdtType with selected type)
      const matchesType = this.selectedType ? product.pdtType === this.selectedType : true;
  
      return (
        // Apply filters if any are selected, otherwise show all
        (matchesColor || this.colors.every(color => !color.selected)) &&
        (matchesBrand || this.brands.every(brand => !brand.selected)) &&
        (matchesType)  // Only apply type filter if a type is selected
      );
    });
  }

  applySearch(): void {
    if (this.searchQuery.trim() === '') {

      this.filteredProducts = this.products;
    } else {

      this.filteredProducts = this.products.filter(product =>
        product.pdtName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.pdtCategory.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  

  clearAllBrands(): void {
    this.brands.forEach(brand => brand.selected = false);
    this.applyFilters();  
  }

  clearAllColors(): void {
    this.colors.forEach(color => color.selected = false);
    this.applyFilters();
  }

  clearType():void{
    this.selectedType = "";
    this.applyFilters();
  }

  openProductModal(product: any, productModal: any): void {
    this.selectedProduct = product; // Set the selected product
    this.modalService.open(productModal); // Open the modal
  }
  
  
  
}



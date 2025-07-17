import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

// Type definitions - moved outside the component
interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

interface CartSummary {
  subtotal: number;
  originalTotal: number;
  savings: number;
  tax: number;
  total: number;
}

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  
  // Cart data
  cartData: CartItem[] = [
    { id: 1, name: "iPhone 14 Pro", price: 89999, originalPrice: 99999, quantity: 1 },
    { id: 2, name: "AirPods Pro (2nd Gen)", price: 24999, originalPrice: 26999, quantity: 2 },
    { id: 3, name: "MacBook Air M2", price: 114999, originalPrice: 119999, quantity: 1 },
    { id: 4, name: "Apple Watch Series 9", price: 41999, originalPrice: 44999, quantity: 1 }
  ];

  // Computed properties for summary
  get cartSummary(): CartSummary {
    const subtotal = this.cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = this.cartData.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const savings = originalTotal - subtotal;
    const tax = Math.round(subtotal * 0.09); // 9% tax
    const total = subtotal + tax;

    return { subtotal, originalTotal, savings, tax, total };
  }

  get totalItems(): number {
    return this.cartData.reduce((sum, item) => sum + item.quantity, 0);
  }

  get isEmpty(): boolean {
    return this.cartData.length === 0;
  }

  // Promo code state
  promoCode: string = '';
  isApplyingPromo: boolean = false;
  isProcessingCheckout: boolean = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Add CSS for slide out animation
    this.addSlideOutAnimation();
  }

  // Update quantity
  updateQuantity(itemId: number, change: number): void {
    const item = this.cartData.find(item => item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
    }
  }

  // Remove item with animation
  removeItem(itemId: number): void {
    const itemElement = this.elementRef.nativeElement.querySelector(`[data-id="${itemId}"]`);
    if (itemElement) {
      this.renderer.setStyle(itemElement, 'animation', 'slideOut 0.3s ease-in');
      
      setTimeout(() => {
        this.cartData = this.cartData.filter(item => item.id !== itemId);
      }, 300);
    }
  }

  // Apply promo code
  applyPromo(): void {
    const promoCode = this.promoCode.trim();
    
    if (promoCode === '') {
      alert('Please enter a promo code');
      return;
    }
    
    this.isApplyingPromo = true;
    
    setTimeout(() => {
      if (promoCode.toLowerCase() === 'save10') {
        alert('Promo code applied! You saved ₹5,000');
        this.promoCode = '';
        // In a real app, you'd modify the cartData or add a discount property
        // For now, we'll just show the alert
      } else {
        alert('Invalid promo code');
      }
      
      this.isApplyingPromo = false;
    }, 1000);
  }

  // Proceed to checkout
  proceedToCheckout(): void {
    this.isProcessingCheckout = true;
    
    setTimeout(() => {
      alert('Redirecting to checkout...');
      this.isProcessingCheckout = false;
    }, 2000);
  }

  // Add CSS for slide out animation
  private addSlideOutAnimation(): void {
    const style = this.renderer.createElement('style');
    const styleContent = `
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(-100%);
        }
      }
    `;
    this.renderer.appendChild(style, this.renderer.createText(styleContent));
    this.renderer.appendChild(document.head, style);
  }

  // Utility methods for template
  formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString()}`;
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }
}
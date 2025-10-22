import { CurrencyPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, NgForOf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  [x: string]: any;
  checkoutFormGroup: FormGroup = new FormGroup({});
  totalPrice: number = 0;
  totalQuantity: number = 0;
  monthsList: number[] = [];
  yearsList: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        country: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        country: [''],
      }),
      creditCard: this.formBuilder.group({
        cardtType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    const currentMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(currentMonth).subscribe((data) => {
      this.monthsList = data;
    });

    this.formService.getCreditCardYears().subscribe((data) => {
      this.yearsList = data;
    });
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
}

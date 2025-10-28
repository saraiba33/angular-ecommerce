import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs';
import { FormService } from '../../services/form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, NgForOf, NgIf],
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
  countries: Country[] = [];
  states: State[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,20}$'),
        ]),
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

    this.formService.getCountries().subscribe((data) => {
      this.countries = data;
    });

    this.formService
      .getStates(this.checkoutFormGroup.value.billingAddress.country)
      .subscribe((data) => {
        this.states = data;
      });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    this.formService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }
      formGroup?.get('state')?.setValue(data[0]);
    });
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }
}

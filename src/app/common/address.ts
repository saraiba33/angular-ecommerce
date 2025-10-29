export class Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCpde: string;

  constructor(
    street: string,
    city: string,
    state: string,
    country: string,
    zipCpde: string
  ) {
    this.city = city;
    this.street = street;
    this.state = state;
    this.country = country;
    this.zipCpde = zipCpde;
  }
}

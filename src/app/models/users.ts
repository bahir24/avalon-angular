export interface IUser {
  id?: string,
  login: string,
  email?: string,
  password: string;
  cardNumber?: number;
}

export interface IVoucherCustomer {
  firstName: string,
  lastName: string,
  cardNumber: number,
  birthDay: Date,
  age: number,
  citizen: string
}

export interface IStatisticUser {
  id: number,
  name: string,
  username: string,
  email: string,
  address: IStatisticUserAddress,
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}
export interface IStatisticUserAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string
  }
}
export interface ICustomStatisticUser {
  name: string,
  company: string,
  phone: string,
  id: number,
  city: string,
  street: string
}

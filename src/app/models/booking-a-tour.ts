import {ITour} from "./tours";
import {IVoucherCustomer} from "./users";

export interface IBookingATour {
  ticket: ITour | undefined,
  user: IVoucherCustomer
}

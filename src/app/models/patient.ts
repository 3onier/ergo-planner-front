export class Patient {
  id?: number;
  title?: string;
  first_name?: string;
  last_name?: string;
  date_birth?: Date;
  address_1?: string;
  address_2?: string;
  post_code?: string;
  city?: string;
  phone_number?: string;
  fax_number?: string;
  email?: string;
  insurance_name?: string;
  insurance_number?: string;

  constructor(params: Partial<Patient> = {}) {
    Object.assign(this, params);
  }

  getListName(){
    return this.last_name + ", " + this.first_name;
  }

}
export type Patients = Array<Patient>;

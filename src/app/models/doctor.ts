export class Doctor {
  id?: number;
  title?: string;
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  post_code?: string;
  city?: string;
  phone_number?: string;
  fax_number?: string;
  email?: string;

  constructor(params: Partial<Doctor> = {}) {
    Object.assign(this, params);
  }

  getListName(): string{
    let out = "";
    if(this.title)
      out += this.title + " ";
    if (this.last_name)
      out += this.last_name;
    if (this.first_name)
      out += ", "  + this.first_name;
    return out;
  }

}

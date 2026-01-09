export class IcdCode{
  id?: number;
  description? : string;
  primary_code_1?: string;
  primary_code_2?: string;
  star_code?: string;
  additional_code?: string;

  constructor(params: Partial<IcdCode> = {}) {
    Object.assign(this, params);
  }

  toString(): string{
    let str = "";
    if(this.primary_code_1)
      str += this.primary_code_1 + " ";
    if(this.primary_code_2)
      str += this.primary_code_2+ " ";
    if(this.star_code)
      str += this.star_code + " ";
    if(this.additional_code)
      str += this.additional_code + " ";
    return  str;
  }

  searchResultTitle(): string{
    return this.toString();
  }

}

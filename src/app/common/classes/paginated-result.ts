export class PaginatedResult<T>{
  public count?: number;
  public page?: number;
  public results?: T[];
  public pages?: number;
  public page_size?: number;

  constructor(params: Partial<PaginatedResult<T>>){
    Object.assign(this, params);
  }
}

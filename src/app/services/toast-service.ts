import {Injectable, signal} from '@angular/core';
import {Toast} from '../common/interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private _toasts = signal<Array<Toast>>([]);
  public toasts = this._toasts.asReadonly();

  public displayToast(toast: Toast){
    this._toasts.update( (toasts) => [...toasts, toast] );
  }

  public deleteToast(toast: Toast){
    this._toasts.update(
      (ts) => {
        return ts.filter( (t) => t != toast );
      }
    );
  }

}

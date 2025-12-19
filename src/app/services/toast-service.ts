import { Injectable } from '@angular/core';
import {Toast} from '../common/interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public displayToast(toast: Toast){
    console.log(toast.text);
  }
}

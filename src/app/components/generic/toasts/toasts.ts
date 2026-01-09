import {Component, inject, signal} from '@angular/core';
import {ToastService} from '../../../services/toast-service';
import {Toast} from '../../../common/interfaces/toast';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts',
  imports: [
    NgbToast
  ],
  templateUrl: './toasts.html',
  styleUrl: './toasts.css',
})
export class Toasts {

  protected toastService = inject(ToastService);

}

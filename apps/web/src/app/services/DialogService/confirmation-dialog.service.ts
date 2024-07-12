import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private confirmationService: ConfirmationService) {}

  confirm(message: string, acceptCallback: () => void, rejectCallback?: () => void) {
    this.confirmationService.confirm({
      message: message,
      accept: () => {
        acceptCallback();
      },
      reject: (type) => {
        if (rejectCallback) {
          rejectCallback();
        }
      },
    });
  }
}

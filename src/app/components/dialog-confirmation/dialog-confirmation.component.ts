import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss'
})
export class DialogConfirmationComponent {
  @Input() metadata!: { title: string, text: string, cancelMessage: string, confirmMessage: string };

  @Output() option = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  public openDialog() {
    this.dialog.nativeElement.showModal();
  }

  public closeDialog() {
    this.dialog.nativeElement.close();
  }

  public selectOption(option: boolean) {
    this.dialog.nativeElement.close();
    this.option.emit(option);
  }

}

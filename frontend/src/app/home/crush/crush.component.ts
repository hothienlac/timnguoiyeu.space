import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { CrushService } from './crush.service';
import { UncrushComponent } from './uncrush/uncrush.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NewCrushComponent } from './new-crush/new-crush.component';

@Component({
  selector: 'ngx-crush',
  templateUrl: './crush.component.html',
  styleUrls: ['./crush.component.scss']
})
export class CrushComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: false,
      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      email: {
        title: 'Email',
        filter: false
      }
    },
    mode: 'external',

  };

  source: any;

  constructor(
    private readonly crushService: CrushService,
    private readonly dialogService: NbDialogService,
    private readonly toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.loadCrush()
  }

  loadCrush() {
    this.crushService.getCrushes().subscribe(
      (respond: {crush: Array<any>, message: string}) => {
        this.source = respond.crush.map(email => Object({email}));
      },
      (error: HttpErrorResponse) => {
        this.toastrService.show(
          error.error.message || error.error.code || error,
          'Error',
          {
            status: 'danger',
            destroyByClick: true,
            duration: 5000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
          }
        );
      },
    );
  }

  uncrush(event): void {
    this.dialogService.open(
      UncrushComponent,
      {
        context: { email: event.data.email },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      }
    ).onClose.subscribe(confirmed => {
      confirmed && this.crushService.uncrush(event.data.email).subscribe(
        (respond: {message: String}) => {
          this.toastrService.show(
            respond.message,
            'Success',
            {
              status: 'success',
              destroyByClick: true,
              duration: 5000,
              hasIcon: true,
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
            }
          );
          this.loadCrush();
        },
        (error: HttpErrorResponse) => {
          this.toastrService.show(
            error.error.message || error.error.code || error,
            'Error',
            {
              status: 'danger',
              destroyByClick: true,
              duration: 5000,
              hasIcon: true,
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
            }
          );
        },
      );
    });

    // if (window.confirm(`Are you sure you want to uncrush ${event.data.email}?`)) {
    //   this.source = this.source.filter((user) => user.email !== event.data.email);
    //   window.alert(`Uncrushed ${event.data.email}`);
    // }    
  }

  newCrush() {
    this.dialogService.open(
      NewCrushComponent,
      {
        closeOnBackdropClick: false,
        closeOnEsc: false,
      }
    ).onClose.subscribe(x => this.loadCrush())
  }

}

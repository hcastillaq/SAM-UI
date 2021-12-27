import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SNACKBAR } from 'src/app/components/snackbar/snackbar.component';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { TransactionEntityService } from 'src/app/store/entity/transactions/transaction.entity.service';
import { Observable } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from 'src/app/helpers/date/adapter';
import { TRANSLATE } from 'src/app/helpers/dictionary.helpers';
@Component({
  selector: 'app-dialog-transaction',
  templateUrl: './dialog-transaction.component.html',
  styleUrls: ['./dialog-transaction.component.scss'],
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
})
export class DialogTransactionComponent implements OnInit {
  form: FormGroup;
  loading: Observable<boolean> = this.transactionsEntityService.loading$;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { action: 'create' | 'update' | 'delete'; item: Transaction },
    private fb: FormBuilder,
    private ref: MatDialogRef<DialogTransactionComponent>,
    private transactionsEntityService: TransactionEntityService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      mount: ['', [Validators.required, Validators.min(0)]],
      type: ['', [Validators.required]],
      description: [''],
      date: [new Date().toISOString().split('T')[0], [Validators.required]],
    });
    this.fillFormUpdateData();
  }

  fillFormUpdateData() {
    if (this.data.action === 'update') {
      for (let key in this.form.value) {
        if (key === 'date') {
          this.form.get('date').setValue(new Date(this.data.item[key]));
        } else {
          this.form.get(key).setValue(this.data.item[key]);
        }
      }
    }
  }

  create() {
    this.transactionsEntityService.add(this.form.value).subscribe((e) => {
      SNACKBAR.next({
        message: 'Transaction created successfully',
        type: 'success',
      });
      this.ref.close();
    });
  }

  update() {
    this.transactionsEntityService.update({
      ...this.data.item,
      ...this.form.value,
    });
    this.ref.close();
  }

  translate(word: any) {
    return TRANSLATE(word);
  }
}

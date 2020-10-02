import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SNACKBAR } from 'src/app/components/snackbar/snackbar.component';
import { ITransaction } from 'src/app/interfaces/transaction.interface';
import { CUSTOM_DATE_FORMAT } from 'src/app/material.module';
import { TransactionEntityService } from 'src/app/store/entity/transactions/transaction.entity.service';
import * as moment from 'moment';
@Component({
  selector: 'app-dialog-transaction',
  templateUrl: './dialog-transaction.component.html',
  styleUrls: ['./dialog-transaction.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
  ]
})
export class DialogTransactionComponent implements OnInit {

  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { action: "create" | "update" | "delete", item: ITransaction },
    private fb: FormBuilder,
    private ref: MatDialogRef<DialogTransactionComponent>,
    private transactionsEntityService: TransactionEntityService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      mount: ["", [Validators.required, Validators.min(0)]],
      type: ["", [Validators.required]],
      description: ["", [Validators.required]],
      date: [moment(new Date(), ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]).format(), [Validators.required]]
    });
    this.fillFormUpdateData();
  }

  fillFormUpdateData() {
    if (this.data.action === "update") {
      this.data.item.date = moment(String(this.data.item.date), ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]).format()
      for (let key in this.form.value) {
        this.form.get(key).setValue(this.data.item[key]);
      }
    }
  }

  create() {
    this.transactionsEntityService.add(this.form.value).subscribe(e => {
      SNACKBAR.next({
        message: "Transaction created successfully",
        type: "success",
      });
      this.ref.close();
    });
  }

  update() {
    delete this.data.item.company;
    delete this.data.item.user;
    delete this.data.item.__typename;
    this.transactionsEntityService.update({ ...this.data.item, ...this.form.value });
    this.ref.close();
  }
}

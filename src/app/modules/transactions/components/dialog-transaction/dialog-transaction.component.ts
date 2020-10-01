import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionEntityService } from 'src/app/store/entity/transactions/transaction.entity.service';

@Component({
  selector: 'app-dialog-transaction',
  templateUrl: './dialog-transaction.component.html',
  styleUrls: ['./dialog-transaction.component.scss']
})
export class DialogTransactionComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private transactionsEntityService: TransactionEntityService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      mount: ["", [Validators.required, Validators.min(0)]],
      type: ["", [Validators.required]],
      description: ["", [Validators.required]],
      date: ["", [Validators.required]]
    });
  }

  create() {
    this.transactionsEntityService.add({ ...this.form.value, date: new Date(this.form.value.date).toISOString() });
  }
}

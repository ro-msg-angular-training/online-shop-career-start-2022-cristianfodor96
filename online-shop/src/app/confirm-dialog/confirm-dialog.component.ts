import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

    closeDialog(): void {
        this.dialogRef.close(false);
    }
}

import { Observable, of } from 'rxjs';

export class MockConfirmationDialogService {
    confirm(message: string): Observable<boolean> {
        return of(true);
    }
}

export class MatDialogMock {
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open(): any {
        return {
            afterClosed: () => of('Product deleted')
        };
    }

    close(): any {
        return {
            afterClosed: () => of('Dialog closed')
        };
    }
}

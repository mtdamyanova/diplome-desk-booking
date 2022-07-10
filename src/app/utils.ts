import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export const onOpenSnackBar = (snackBar: MatSnackBar, message: string) => {
  const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  const verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBar.open(message, 'X', {
    horizontalPosition: horizontalPosition,
    verticalPosition: verticalPosition,
    duration: 3000,
  });
};

export const url =
  'https://diplome-b9d0c-default-rtdb.europe-west1.firebasedatabase.app/';

import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SweetalertService } from '../../services/sweetalert/sweetalert.service';
import { inject } from '@angular/core';
import { ErrorService } from '../../services/error/error.service';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

const errorService = inject(ErrorService);

  
    
   return next(req).pipe(catchError((err)=>{
    // logic on error
    console.log(err);
    const msg = err?.error?.message || 'Unexpected error occurred';
    errorService.setError(msg);
    
    
    return throwError(()=>err)
  }))
  


};

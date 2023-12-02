import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    canActivate() {
        let Role = sessionStorage.getItem("role");
        if (Role == "ADMIN") {
            return true;
        }
        return false;
    }

}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NgZorroAntdModule } from './ant-design/ant-design.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateOptionsComponent } from './components/authenticate-options/authenticate-options.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SecurityInfoComponent } from './components/security-info/security-info.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ModalCreateTotpComponent } from './modals/modal-create-totp/modal-create-totp.component';
import { ModalInputEmailComponent } from './modals/modal-input-email/modal-input-email.component';
import { ModalInputPhoneNumberComponent } from './modals/modal-input-phone-number/modal-input-phone-number.component';
import { ModalRegisterComponent } from './modals/modal-register/modal-register.component';
import { AdminBillDetailComponent } from './pages/admin/admin-bill-detail/admin-bill-detail.component';
import { AdminClientListComponent } from './pages/admin/admin-client-list/admin-client-list.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminMonthBillComponent } from './pages/admin/admin-month-bill/admin-month-bill.component';
import { AdminMotelRoomComponent } from './pages/admin/admin-motel-room/admin-motel-room.component';
import { AdminRentalContractComponent } from './pages/admin/admin-rental-contract/admin-rental-contract.component';
import { AdminRoomDetailComponent } from './pages/admin/admin-room-detail/admin-room-detail.component';
import { AdminServiceListComponent } from './pages/admin/admin-service-list/admin-service-list.component';
import { AdminSidebarComponent } from './pages/admin/admin-sidebar/admin-sidebar.component';
import { CustomerRentalRoomComponent } from './pages/admin/custormer-rental-room/custormer-rental-room.component';
import { ModalAdminCreateClientComponent } from './pages/admin/modal/modal-admin-create-client/modal-admin-create-client.component';
import { ModalAdminCreateRoomComponent } from './pages/admin/modal/modal-admin-create-room/modal-admin-create-room.component';
import { ModalAdminCreateServiceComponent } from './pages/admin/modal/modal-admin-create-service/modal-admin-create-service.component';
import { ModalAdminUpdateClientComponent } from './pages/admin/modal/modal-admin-update-client/modal-admin-update-client.component';
import { ModalAdminUpdateRoomComponent } from './pages/admin/modal/modal-admin-update-room/modal-admin-update-room.component';
import { ModalAdminUpdateServiceComponent } from './pages/admin/modal/modal-admin-update-service/modal-admin-update-service.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AdminSidebarComponent,
    AdminMotelRoomComponent,
    AdminRentalContractComponent,
    AdminDashboardComponent,
    ModalAdminCreateRoomComponent,
    AdminRoomDetailComponent,
    CustomerRentalRoomComponent,
    ModalAdminCreateClientComponent,
    AdminClientListComponent,
    ModalRegisterComponent,
    VerifyOtpComponent,
    SecurityInfoComponent,
    ModalCreateTotpComponent,
    AuthenticateOptionsComponent,
    ModalInputPhoneNumberComponent,
    ModalInputEmailComponent,
    AdminMotelRoomComponent,
    AdminRentalContractComponent,
    AdminDashboardComponent,
    ModalAdminCreateRoomComponent,
    AdminRoomDetailComponent,
    CustomerRentalRoomComponent,
    ModalAdminCreateClientComponent,
    AdminClientListComponent,
    ModalAdminUpdateRoomComponent,
    ModalAdminUpdateClientComponent,
    AdminServiceListComponent,
    ModalAdminCreateServiceComponent,
    ModalAdminUpdateServiceComponent,
    AdminMonthBillComponent,
    AdminBillDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

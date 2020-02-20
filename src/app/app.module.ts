import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ForgetComponent } from './components/forget/forget.component';
import { AuthService } from "./services/auth.service";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { TemplateWithSidebarComponent } from './templates/template-with-sidebar/template-with-sidebar.component';
import { SocietyComponent } from './components/society/society.component';
import { ToastrModule } from 'ngx-toastr';

import { SocietyformComponent } from './components/societyform/societyform.component';
import { SocietyService } from './services/soceity.service';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    SidebarComponent,
    ForgetComponent,
    TemplateWithSidebarComponent,
    SocietyComponent,
    SocietyformComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
 
    ToastrModule.forRoot()
  ],
  providers:[AuthService,SocietyService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

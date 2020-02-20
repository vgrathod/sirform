import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { SocietyService } from 'src/app/services/soceity.service';
import { Society } from 'src/app/models/society.model';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-societyform',
  templateUrl: './societyform1.component.html',
  styleUrls: ['./societyform.component.css']
})
export class SocietyformComponent implements OnInit {
  list: Society[];
  errorMessage: any;

  societyForm: FormGroup;

  constructor(
    private service: SocietyService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    console.log();
  }

  ngOnInit() {

    this.createSocietyForm();
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id)
    if (id == 0) {
      console.log('New society');
      this.resetForm();
    }
    else {
      this.service.getSociety(id)
        .subscribe(
          (society: Society) => {
            console.log(society);
            this.displaySociety(society);
          },
          (error: any) => this.errorMessage = <any>error
          //society => console.log(society)
        )
    }
  }

  private createSocietyForm() {
    this.societyForm = this.formBuilder.group({
      s_name: [''],
      s_address: [''],
      p_name: [''],
      m_number: ['']
    });
  }

  displaySociety(society: Society): void {
    this.service.formData = society;

    delete society.id;

    this.societyForm.setValue(society);

    // Update the data on the form
    /*
    this.form({
      s_address: this.service.formData.s_address,
      s_name: this.service.formData.s_name,
      p_name: this.service.formData.p_name,
      m_number: this.service.formData.m_number
    });
    */
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      s_address: "",
      s_name: "",
      p_name: "",
      m_number: ""
    }
  }


  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('Societies ').add(data);
    else
      this.firestore.doc('Societies /' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted Succesfully !');
  }

  submitForm(){
    console.log(this.societyForm.value);
    

  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { SocietyService } from 'src/app/services/soceity.service';
import { Society } from 'src/app/models/society.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-societyform',
  templateUrl: './societyform.component.html',
  styleUrls: ['./societyform.component.css']
})
export class SocietyformComponent implements OnInit {
  list:Society[];
  constructor(
    private service: SocietyService,
    private firestore:AngularFirestore,
    private toastr :ToastrService,
    private activatedRoute: ActivatedRoute
    ) { 
      console.log();
  }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.params.id;
      console.log(id)
      if(id == 0 )
      {
        console.log('agar 0 he to jayega');
        //this.resetForm();
        this.service.formData = {
          id:null,
          s_address:"vishal",
          s_name:"vishal",
          p_name:"vishal",
          m_number:"vishal"
        }
      
      }
      else
      {
        this.service.getSociety(id)
        .subscribe(
          society => console.log(society)
        ) 
      }
    /*this.service.getSocieties().subscribe(actionArray=>{
      this.list=actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data()} as Society;
      })
      });*/
      
  }
  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData={
      id:null,
      s_address:"",
      s_name:"",
      p_name:"",
      m_number:""
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
}

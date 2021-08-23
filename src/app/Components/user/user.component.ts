import { OccupationAreaService } from './../occupation-area/occupation-area.service';
import { AuthService } from './../login/auth.service';
import { NotifyService } from './../common/notify/notify.service';
import { Generic } from './../common/generic.model';
import { HomeService } from './../../views/home/home.service';
import { User } from './user.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from './user.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AccountSubheaderService } from '../Template/account-subheader/account-subheader.service';
import { AccountSidebarService } from '../Template/account-sidebar/account-sidebar.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { CEPError, Endereco, NgxViacepService } from '@brunoc/ngx-viacep';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  PHONE_MASK : any= {
    mask : [
      {
        length : 10,
        mask : '(00) 0000-0000'
      },
      {
        length: 11,
        mask : '(00) 0 0000-0000'
      }
    ]
  };
  
  newUser : boolean = false;
  userSubscription !: Subscription;
  userEditSubscription !: Subscription;
  loading !: Boolean;
  form !: FormGroup;
  passwordMatch  !: Boolean;
  areaSubscription !: Subscription;
  areas !: Generic[];
  userType: string = '';
  id !: number;


  constructor(
    private  formBuilder: FormBuilder,
    private subheaderService: AccountSubheaderService, 
    private userService : UserService,
    private accountSidebarService: AccountSidebarService,
    private activeRoute: ActivatedRoute,
    private homeService : HomeService,
    private notifyService: NotifyService,
    private authService : AuthService,
    private viacep: NgxViacepService,
    private renderer: Renderer2,
    private occupationAreaService : OccupationAreaService,
    private router: Router,
    private route: ActivatedRoute,

    ){}

  getAddrViaCep(){
    if(this.form.get("zipCode")?.invalid)
      return;
    
    setTimeout(() => {this.accountSidebarService.blockPage()}, 0)

    let cep = this.form.get("zipCode")?.value;
    this.viacep
    
    .buscarPorCep(cep)
    .pipe(
      catchError((error: CEPError) => {
        this.notifyService.notifyError("CEP não encontrado");
        return EMPTY;
      })
    )
    .subscribe((endereco: Endereco) => {
      this.form.patchValue({
        address: endereco.logradouro,
        district: endereco.bairro,  
        city: endereco.localidade, 
        state: endereco.uf, 
      });

      this.renderer.selectRootElement('#address').focus();    
    }).add(() => {
      setTimeout(() => {this.accountSidebarService.unblockPage()}, 0)
    });
  }

  ngOnInit(){

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.getAreas();

    this.activeRoute.pathFromRoot[1].url.subscribe(
      val => {
        this.newUser = ( val!= undefined && val.length > 0 && val[0].path != 'account')
      }
    );

    if(this.newUser){
        this.form = this.formBuilder.group({
          name: [null, [Validators.required, Validators.minLength(2)]], 
          uniqueId: [null, [Validators.required, Validators.minLength(11), Validators.pattern(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/)]], 
          isOrg: [false, []], 
          category: [null], 
          bio: [null], 
          profileImage: [null], 
          phone: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10)]], 
          email: [ null, [Validators.required, Validators.email] ], 
          site: [null, [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]], 
          address:[null, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]], 
          addressNumber:[null, [Validators.maxLength(45)]],  
          addressComplement:[null, [Validators.maxLength(45)]], 
          district:[null, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],  
          city: [null,[Validators.required, Validators.minLength(2), Validators.maxLength(45)]], 
          state: [null,[Validators.required, Validators.minLength(2)]], 
          zipCode: [null,[Validators.required, Validators.maxLength(8)]],
          password:[null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],  
          confirmPassword:[null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],  
        },{
          validators: this.passwordMatchValidator.bind(this)
        });

        this.form.controls['isOrg'].valueChanges.subscribe(
          isOrg => {
            if(isOrg==null || isOrg=="" || !isOrg)
              this.removeCategoryRequired();
            else
              this.setCategoryRequired();
          }
        );
        
      }else{
        this.form = this.formBuilder.group({
          name: [null, [Validators.required, Validators.minLength(2)]], 
          uniqueId: [{value: null, disabled: true}, [Validators.pattern(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/)]], 
          isOrg: [null, []], 
          category: [null],
          bio: [null], 
          profileImage: [null], 
          phone: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10)]], 
          email: [ {value: null, disabled: true}, [Validators.required, Validators.email] ], 
          site: [null, [Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]], 
          address:[null, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]], 
          addressNumber:[null, [Validators.maxLength(45)]],  
          addressComplement:[null, [Validators.maxLength(45)]], 
          district:[null, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],  
          city: [null,[Validators.required, Validators.minLength(2), Validators.maxLength(45)]], 
          state: [null,[Validators.required, Validators.minLength(2)]], 
          zipCode: [null, Validators.maxLength(8)],
          password:[null, [Validators.minLength(8), Validators.maxLength(20)]],  
          newPassword:[null, [Validators.minLength(8), Validators.maxLength(20)]],  
          confirmPassword:[null, [Validators.minLength(8), Validators.maxLength(20)]],
          type : [null], 
          status : [null],    
        },{
          validators: this.newPasswordMatchValidator.bind(this)
        });
        

        if(this.id==undefined || this.id==0){
          this.subheaderService.setTitle('Meus dados');
          this.getUser();
        }
        else{
          this.getUserToManage();
          this.subheaderService.setTitle('Editar usuário');
        }


        this.form.controls['password'].valueChanges.subscribe(
          pass => {
            if(pass!=null && pass!="")
              this.setNewPassRequired();
            else
              this.removeNewPassRequired();
          }
        );

      }

      this.form.controls['type'].valueChanges.subscribe(value => {
        if(this.form.get('type')?.value ==2){
          this.setCategoryRequired();
        }
      });

      this.authService.userType.subscribe(value => {
        this.userType = value
        if(this.userType=='ROLE_ORG'){
          this.form.disable();
          this.setCategoryRequired();
          this.enablePassReset();
        }
      });
  
    }

    enablePassReset(){
      this.form.controls['password'].enable();
      this.form.controls['newPassword'].enable();
      this.form.controls['confirmPassword'].enable();
    }

    getAreas(){
      this.areaSubscription = this.occupationAreaService.getOccupationAreas().subscribe(
        (response) => {
             this.areas = response;
        },
        (error) =>{
  
        },
      ).add(() => {
  
      });
    }

  removeNewPassRequired(){
    this.form.controls['newPassword'].setValidators([ ]);
    this.form.controls["newPassword"].updateValueAndValidity();
    this.form.controls['confirmPassword'].setValidators([ ]);
    this.form.controls["confirmPassword"].updateValueAndValidity();

    this.passwordMatch = false;

  }

  removeCategoryRequired(){
    this.form.controls['category'].setValidators([ ]);
    this.form.controls["category"].updateValueAndValidity();

    this.form.controls['bio'].setValidators([ ]);
    this.form.controls["bio"].updateValueAndValidity();

    this.form.controls['profileImage'].setValidators([ ]);
    this.form.controls["profileImage"].updateValueAndValidity();
  }

  setCategoryRequired(){
    this.form.controls['category'].setValidators([
      Validators.required,
    ]);
    this.form.controls["category"].updateValueAndValidity();  

    this.form.controls['bio'].setValidators([
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(1000),
    ]);
    this.form.controls["bio"].updateValueAndValidity();  

    this.form.controls['profileImage'].setValidators([
      Validators.required,
      Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
    ]);
    this.form.controls["profileImage"].updateValueAndValidity();  
  }
  
  setNewPassRequired(){
    this.form.controls['newPassword'].setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    ]);
    this.form.controls["newPassword"].updateValueAndValidity();

    this.form.controls['confirmPassword'].setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]);

    this.form.controls["confirmPassword"].updateValueAndValidity();
    
  }

  newPasswordMatchValidator(frm: FormGroup){
    if(frm.controls['password'].value!=null && frm.controls['password'].value!="")
      return frm.controls['newPassword'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
    else 
      return null;
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }

  
  repeatNewPasswordValidator(){
    var ret = this.newPasswordMatchValidator(this.form); 
    if(ret== null )
      this.passwordMatch = false;
    else      
      this.passwordMatch = true;
  }

  repeatPasswordValidator(){
    var ret = this.passwordMatchValidator(this.form); 
    if(ret== null )
      this.passwordMatch = false;
    else      
      this.passwordMatch = true;
  }

  ngOnDestroy(){

    if(this.userSubscription)
      this.userSubscription.unsubscribe();

    if(this.areaSubscription)
      this.areaSubscription.unsubscribe();
    
    if(this.userEditSubscription)
      this.userEditSubscription.unsubscribe();
    
  }

  getUser(){
    setTimeout(() => {this.accountSidebarService.blockPage()}, 0)
    this.userSubscription = this.userService.getUser().subscribe(
      (user) => {
        this.updateForm(user)
      },
      (error) =>{
      },
    ).add(() => {
      setTimeout(() => {this.accountSidebarService.unblockPage()}, 0)
    });
  }

  getUserToManage(){
    setTimeout(() => {this.accountSidebarService.blockPage()}, 0)
    this.userSubscription = this.userService.getUserToManage(this.id).subscribe(
      (user) => {
        this.updateForm(user)
      },
      (error) =>{
      },
    ).add(() => {
      setTimeout(() => {this.accountSidebarService.unblockPage()}, 0)
    });
  }

  
  updateForm(user : User){
      this.form.patchValue({
        name: user.name, 
        uniqueId: user.uniqueId, 
        phone: user.phone, 
        email: user.email, 
        site: user.site,
        address: user.address, 
        addressNumber: user.addressNumber, 
        addressComplement: user.addressComplement, 
        district: user.district,  
        city: user.city, 
        state: user.state, 
        zipCode: user.zipCode,
        bio: user.bio,
        category : user.occupationAreas?.[0]?.id,
        profileImage: user.profileImage,
        type : user.userType?.id,
        status : user.userStatus?.id,
      });
  }

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    if(this.newUser)
      this.createUser();
    else if(this.id==undefined || this.id==0)
      this.updateUser();
    else if(this.id!=undefined && this.id!=0)   
      this.updateManagedUser();
  }

  updateManagedUser(){
    var area : Generic = {};
    var areas : Generic[] = [];

    if(this.form.get('type')?.value ==2){
      area.id= this.form.get("category")?.value;
    }

    if(area.id!=null)
      areas.push(area);
 
    if(this.form.get("occupationAreas")!=null)
      this.form.removeControl("occupationAreas")

    this.form.addControl(
      'occupationAreas', new FormControl(areas),
    );

    var generic : Generic = {};
      generic.id = this.form.get("status")?.value;

    if(this.form.get("userStatus")!=null)
      this.form.removeControl("userStatus")
    
    this.form.addControl(
      'userStatus', new FormControl(generic),
    );

    if(this.form.get("id")!=null)
    this.form.removeControl("id")
    
    this.form.addControl(
      'id', new FormControl(this.id),
    );


    this.loading = true;
    this.userSubscription = this.userService.updateManagedUser(this.form.getRawValue()).subscribe(
      (response) => {
        this.notifyService.notifySuccess('Atualizado com sucesso');
      },
      (error) =>{
      },
    ).add(() => {
      this.loading = false;
    });
  }

  updateUser(){
    var area : Generic = {};
    var areas : Generic[] = [];

    if(this.userType=='ROLE_ORG'){
      area.id= this.form.get("category")?.value;
    }

    if(area.id!=null)
      areas.push(area);
 
    if(this.form.get("occupationAreas")!=null)
      this.form.removeControl("occupationAreas")

    this.form.addControl(
      'occupationAreas', new FormControl(areas),
    );

    if(this.form.get("userType")!=null)
      this.form.removeControl("userType")

    if(this.form.get("userStatus")!=null)
      this.form.removeControl("userStatus")

    this.loading = true;
    this.userSubscription = this.userService.editUser(this.form.getRawValue()).subscribe(
      (response) => {
        this.notifyService.notifySuccess('Atualizado com sucesso');
      },
      (error) =>{
      },
    ).add(() => {
      this.loading = false;
    });
  }

  createUser(){
    setTimeout(() => {this.homeService.blockPage()}, 0)
    this.loading = true;
    var generic : Generic = {};
    var area : Generic = {};
    var areas : Generic[] = [];

    if(this.form.get("isOrg")?.value == false){
      generic.id=1;
    }else{
      generic.id=2;
      area.id= this.form.get("category")?.value;
    }

    if(area.id!=null)
      areas.push(area);
    
    if(this.form.get("userType")!=null)
      this.form.removeControl("userType")
      
    this.form.addControl(
      'userType', new FormControl(generic),
    );
    
    if(this.form.get("occupationAreas")!=null)
      this.form.removeControl("occupationAreas")

    this.form.addControl(
      'occupationAreas', new FormControl(areas),
    );

    this.userSubscription = this.userService.createUser(this.form.getRawValue()).subscribe(
      (response) => {
        let loginForm  = this.formBuilder.group({
          email: [this.form.get("email")?.value], 
          password: [this.form.get("password")?.value]
        });
        if(this.form.get("isOrg")?.value == false)
          this.authService.login(loginForm.getRawValue())
        else{
          this.notifyService.notifySuccess("Usuário criado, aguarde a ativação");
          this.router.navigate(['/home']);
        }
      },
      (error) =>{
      },
    ).add(() => {
      this.loading = false;
      setTimeout(() => {this.homeService.unblockPage()}, 0)
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, input, output, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  valueOpenModal = input<boolean>(false);
  closeModal = output<void>();

  private formBuilder = inject(FormBuilder);
  public formLogin!:FormGroup;
  private readonly authService = inject(Auth);

  constructor(){
    this.formLogin = this.formBuilder.group({
      email : new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password : new FormControl('', Validators.required)
    })
  }


  modalClass = computed(() =>
    this.valueOpenModal() ? 'modal modal-open' : 'modal'
  );

  onClose(): void {
    this.closeModal.emit();
  }

  // * Iniciar sesión

  login():void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched(); return ;
    }


    this.authService.login(this.formLogin.value).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.onClose();
      }

      console.log('ocurrio un error');
    })

  }

}

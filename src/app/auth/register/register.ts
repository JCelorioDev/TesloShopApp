import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'auth-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  valueOpenModal = input<boolean>(false);
  closeRegisterModal = output<void>();
  openLoginModal = output<void>();
  registrationCompleted = output<void>();
  public formRegister!:FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(Auth);

  constructor(){
    this.formRegister = this.fb.group({
      fullName : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password : new FormControl('', Validators.required)
    })
  }

  modalClass = computed(() =>
    this.valueOpenModal() ? 'modal modal-open' : 'modal'
  );

  onClose(): void {
    this.closeRegisterModal.emit();
  }

  // * Emitir evento para abrir el modal login

  changeModalLogin(): void {
    this.onClose();
    this.openLoginModal.emit();
  }
  // * Registrar

  register():void {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched(); return ;
    }


    this.authService.register(this.formRegister.value).subscribe((resp) => {
      if (resp) {
        this.onClose();
        this.registrationCompleted.emit();
        console.log('Registrado con exito'); return;
      }

      console.log(resp);
    })

  }

}

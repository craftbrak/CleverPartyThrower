import {LoginComponent} from './login.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {AuthService} from '../../../auth/auth.service';
import {EventService} from '../../../services/event.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: {
    login: { calls: { count: () => any; }; and: { returnValue: (arg0: Observable<boolean>) => void; }; };
  }, mockRouter: { navigate: any; }, mockActivatedRoute, mockEventService;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['login', 'addEventToUser']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      paramMap: of({
        get: () => null
      })
    };
    mockEventService = jasmine.createSpyObj(['addEventToUser']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: EventService, useValue: mockEventService}
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with empty email and password', () => {
    expect(component.loginForm.value).toEqual({
      email: '',
      password: ''
    });
  });

  it('should not submit if form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    component.onSubmit();

    expect(mockAuthService.login.calls.count()).toBe(0, 'authService.login should not be called');
  });

  it('should handle login failure', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    mockAuthService.login.and.returnValue(of(false));
    component.onSubmit();

    expect(component.CredentialsInValid).toBeTrue();
  });

  it('should handle login success', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    mockAuthService.login.and.returnValue(of(true));
    component.onSubmit();

    expect(component.CredentialsInValid).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    mockAuthService.login.and.returnValue(throwError('Login error'));
    spyOn(console, 'error');
    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Login error:', 'Login error');
  });

  it('should redirect to register', () => {
    component.redirectToRegister();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register', component.eventId ?? '']);
  });
});

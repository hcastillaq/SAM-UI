import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SnackbarTemplateComponent } from './snackbar-template.component';

describe('SnackbarTemplateComponent', () => {
  let component: SnackbarTemplateComponent;
  let fixture: ComponentFixture<SnackbarTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

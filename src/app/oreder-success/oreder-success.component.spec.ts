import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrederSuccessComponent } from './oreder-success.component';

describe('OrederSuccessComponent', () => {
  let component: OrederSuccessComponent;
  let fixture: ComponentFixture<OrederSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrederSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrederSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

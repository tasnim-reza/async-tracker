import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSetTimeoutComponent } from './basic-settimeout.component';

describe('BasicSettimeoutComponent', () => {
  let component: BasicSetTimeoutComponent;
  let fixture: ComponentFixture<BasicSetTimeoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicSetTimeoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSetTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

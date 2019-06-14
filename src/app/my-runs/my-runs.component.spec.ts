import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRunsComponent } from './my-runs.component';

describe('MyRunsComponent', () => {
  let component: MyRunsComponent;
  let fixture: ComponentFixture<MyRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

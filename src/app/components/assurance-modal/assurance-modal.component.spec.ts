/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AssuranceModalComponent} from "./assurance-modal.component";

describe('AssuranceModalComponent', () => {
  let component: AssuranceModalComponent;
  let fixture: ComponentFixture<AssuranceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssuranceModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssuranceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

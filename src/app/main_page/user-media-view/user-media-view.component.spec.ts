/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {UserMediaViewComponent} from "./user-media-view.component";

describe('UserMediaViewComponent', () => {
  let component: UserMediaViewComponent;
  let fixture: ComponentFixture<UserMediaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserMediaViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMediaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

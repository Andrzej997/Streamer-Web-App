/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EbookViewComponent} from "./ebook-view.component";

describe('EbookViewComponent', () => {
  let component: EbookViewComponent;
  let fixture: ComponentFixture<EbookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EbookViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {EbookModalComponent} from "./ebook-modal.component";

describe('EbookModalComponent', () => {
  let component: EbookModalComponent;
  let fixture: ComponentFixture<EbookModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EbookModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

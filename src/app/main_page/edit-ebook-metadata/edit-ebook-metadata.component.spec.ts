/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {EditEbookMetadataComponent} from './edit-ebook-metadata.component';

describe('EditEbookMetadataComponent', () => {
  let component: EditEbookMetadataComponent;
  let fixture: ComponentFixture<EditEbookMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditEbookMetadataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEbookMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

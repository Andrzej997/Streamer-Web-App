/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {EditImageMetadataComponent} from './edit-image-metadata.component';

describe('EditImageMetadataComponent', () => {
  let component: EditImageMetadataComponent;
  let fixture: ComponentFixture<EditImageMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditImageMetadataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

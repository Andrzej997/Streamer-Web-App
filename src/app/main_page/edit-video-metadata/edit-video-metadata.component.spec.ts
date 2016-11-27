/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {EditVideoMetadataComponent} from './edit-video-metadata.component';

describe('EditVideoMetadataComponent', () => {
  let component: EditVideoMetadataComponent;
  let fixture: ComponentFixture<EditVideoMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditVideoMetadataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVideoMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {FileMetadataFormComponent} from './file-metadata-form.component';

describe('FileMetadataFormComponent', () => {
  let component: FileMetadataFormComponent;
  let fixture: ComponentFixture<FileMetadataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileMetadataFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileMetadataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

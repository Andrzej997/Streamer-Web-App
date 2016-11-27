/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {EditMusicMetadataComponent} from './edit-music-metadata.component';

describe('EditMusicMetadataComponent', () => {
  let component: EditMusicMetadataComponent;
  let fixture: ComponentFixture<EditMusicMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditMusicMetadataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMusicMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

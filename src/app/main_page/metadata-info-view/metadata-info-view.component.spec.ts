/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {MetadataInfoViewComponent} from './metadata-info-view.component';

describe('MetadataInfoViewComponent', () => {
  let component: MetadataInfoViewComponent;
  let fixture: ComponentFixture<MetadataInfoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetadataInfoViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

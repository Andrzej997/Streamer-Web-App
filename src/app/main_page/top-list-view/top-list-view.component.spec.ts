/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {TopListViewComponent} from './top-list-view.component';

describe('TopListViewComponent', () => {
  let component: TopListViewComponent;
  let fixture: ComponentFixture<TopListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopListViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

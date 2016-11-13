import {
  OnInit, OnChanges, OnDestroy, SimpleChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked
} from '@angular/core';

export class BaseComponent implements OnInit, OnChanges, OnDestroy, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public ngOnDestroy(): void {
  }

  public ngDoCheck(): void {
  }

  public ngAfterContentInit(): void {
  }

  public ngAfterContentChecked(): void {
  }

  public ngAfterViewInit(): void {
  }

  public ngAfterViewChecked(): void {
  }
}

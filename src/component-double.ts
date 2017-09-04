import {Component, EventEmitter} from '@angular/core';

const DefaultComponentOptions = {
  template: '',
  inputs: [],
  outputs: []
};

export const componentDouble = (options: Component): any => {
  options = {...DefaultComponentOptions, ...options};

  @Component(options)
  class MockComponent {
    private static _instances: MockComponent[] = [];

    static get instances(): ReadonlyArray<MockComponent> {
      return Object.freeze([...this._instances]);
    }

    constructor() {
      MockComponent._instances.push(this);

      for (const input of options.inputs) {
        this[input] = null;
      }

      for (const output of options.outputs) {
        this[output] = new EventEmitter<any>();
      }
    }
  }

  return MockComponent;
};

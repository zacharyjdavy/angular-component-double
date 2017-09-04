# angular-component-double
component test doubles for Angular 2+
[![Build Status](https://travis-ci.org/zacharyjdavy/angular-component-double.svg?branch=master)](https://travis-ci.org/zacharyjdavy/angular-component-double)
[![npm version](https://badge.fury.io/js/angular-component-double.svg)](https://badge.fury.io/js/angular-component-double)<Paste>

## installation
install the package from npm

```
  npm install angular-component-double --save-dev
```

## usage

### creating a component test double:
import the `componentDouble` helper function and pass any [component decorator meta-data](https://angular.io/api/core/Component) that will be required for the test double

```javascript
import { componentDouble } from 'angular-component-double';

describe('Test', () => {
// ...
  let ChildComponentDouble: any;

  beforeEach(async(() => {
    ChildComponentDouble = componentDouble({
      selector: 'child',
      inputs: ['name'],
      outputs: ['greeting']
    });

    TestBed.configureTestingModule({
      declarations: [ParentComponent, ChildComponentDouble]
    });
  });
// ...
```

#### Note: these are the default properties
```
{
  template: '',
  inputs: []
  outputs: []
}
```

### using the component doubles:
each time the component double is rendered in the template, it will be included in the ComponentDouble's list of instances

```javascript
// ...
  it('has a list of instances', () => {
    const [firstChildComponent, ...rest] = ChildComponentDouble.instances;
  });
// ...
```

### accessing inputs
inputs will be bound on the component

```javascript
// ...
  it('assigns the input properties', () => {
    expect(firstChildComponent.name).toEqual('Michael Scott');
  });
// ...
```

### stubbing outputs
event emitters will be assigned to each output

```javascript
// ...
  it('stubs the output subscriptions', () => {
    firstChildComponent.greeting.next('hello');
  });
// ...
```

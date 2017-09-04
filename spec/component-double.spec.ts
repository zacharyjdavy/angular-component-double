import {Component} from "@angular/core";
import {async, TestBed} from "@angular/core/testing";
import {componentDouble} from "../src/component-double";

describe('component double', () => {
  describe('not including a component double for the selector', () => {

    @Component({ template: ` <stub></stub>` })
    class TestComponent {
    }

    it('does not compile the components', async(() => {
      const declarations = [TestComponent];
      TestBed.configureTestingModule({declarations});
      expect(() => TestBed.compileComponents()).toThrow();
    }));
  });

  describe('including a component double for the selector', () => {

    @Component({ template: ` <stub></stub>` })
    class TestComponent {
    }

    it('compiles the components', async(() => {
      const selector = 'stub';
      const declarations = [TestComponent, componentDouble({selector})];
      TestBed.configureTestingModule({declarations});
      expect(() => TestBed.compileComponents()).not.toThrow();
    }));

    it('returns a readonly list of instance', async(() => {
      const selector = 'stub';
      const StubComonent = componentDouble({selector});
      const declarations = [TestComponent, StubComonent];
      TestBed.configureTestingModule({declarations});
      TestBed.createComponent(TestComponent);

      expect(() => StubComonent.instances.push(new StubComonent())).toThrow();
    }));
  });

  describe('including a component double with an input', () => {

    @Component({ template: ` <stub [key]="value"></stub>` })
    class TestComponent {
      value = 'value';
    }

    it('compiles the components', async(() => {
      const selector = 'stub';
      const inputs = ['key'];
      const declarations = [TestComponent, componentDouble({selector, inputs})];
      TestBed.configureTestingModule({declarations});

      expect(() => TestBed.compileComponents()).not.toThrow();
    }));

    it('is able to access the assigned input on the component double instances', async(() => {
      const selector = 'stub';
      const inputs = ['key'];
      const StubComponent = componentDouble({selector, inputs});
      const declarations = [TestComponent, StubComponent];
      TestBed.configureTestingModule({declarations});

      TestBed.compileComponents();
      const fixture = TestBed.createComponent(TestComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      expect(StubComponent.instances[0].key).toEqual(component.value);
    }));

    describe('including a component double with an output', () => {

      @Component({ template: ` <stub (event)="called($event)"></stub>` })
      class TestComponent {
        called: any;

        constructor() {
          this.called = jasmine.createSpy('called');
        }
      }

      it('is able to stub the output subscription on the component double instances', async(() => {
        const $event = 'foo';
        const selector = 'stub';
        const outputs = ['event'];
        const StubComponent = componentDouble({selector, outputs});
        const declarations = [TestComponent, StubComponent];
        TestBed.configureTestingModule({declarations}).compileComponents();
        const fixture = TestBed.createComponent(TestComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        StubComponent.instances[0].event.next($event);

        expect(component.called).toHaveBeenCalledWith($event);
      }));
    });
  });
});

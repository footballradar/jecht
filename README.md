# Jecht - Simple DI

_A basic dependency injection library for modern JS._

## Quickstart

Install from NPM:

`npm install jecht`

Annotate dependencies:

```javascript
import {
    bind,
    Factory,
    Inject,
    Injector,
    Provides
} from "jecht";

class FooService {
    getThings() {
        // Get some things
    }
}

@Inject(FooService)
class BarService {
    constructor(fooService: FooService) {
        this.fooService = fooService;
    }
}
```

Get instance with injected dependencies:

```javascript
var injector = new Injector();
var barService: BarService = injector.get(BarService);
barService.fooService.constructor === FooService; // true
```

Bind an arbitrary object to a class or interface:

```javascript
var fooInstance = {
    getValue() {
        return 42;
    }
};

class Foo {
    getValue() {
        return;
    }
}

@Inject(Foo)
class Bar {
    constructor(foo: Foo) {
        this.foo = foo;
    }
}

var injector = new Injector([
    bind(fooInstance).to(Foo)
]);

var bar: Bar = injector.get(Bar);
bar.foo.getValue(); // 42
```

Provide alternative dependencies (for mocking, etc):

```javascript
@Provides(FooService)
class MockFooService {
    getThings() {
        // Get some other things
    }
}

var injector = new Injector([MockFooService]);
var barService = injector.get(BarService);
barService.fooService.constructor === MockFooService; // true
```

Create a factory for a dependency:

```javascript
class FooService {
    getThings() {
        // Get some things
    }
}

class OtherFooService {
    getThings() {
        // Get some other things
    }
}

var fooServiceFactory = Factory.create(function() {
    if (useFoo) {
        return FooService;
    } else {
        return OtherFooService;
    }
});

@Inject(fooServiceFactory)
class Bar {
    constructor(fooService: FooService | OtherFooService) {

    }
}

var useFoo = true;
var injector = new Injector();
var bar = injector.get(Bar);
bar.fooService.contructor === FooService; // true
```

## License

MIT

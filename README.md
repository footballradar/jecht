# Jecht - Simple DI

![https://travis-ci.org/footballradar/jecht](https://travis-ci.org/footballradar/jecht.svg)

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

Bind an object of a class to an instance of another class:

```javascript
class Foo {
    getValue() {
        return;
    }
}

class OtherFoo {
    getValue() {
        return 42;
    }
}

@Inject(Foo)
class Bar {
    constructor(foo: Foo) {
        this.foo = foo;
    }
}

var injector = new Injector([
    bind(Foo).to(OtherFoo) //
]);

var bar: Bar = injector.get(Bar);
bar.foo.getValue(); // 42
```
Bind a string token to an instance of a class:

```javascript
class Foo {
    getValue() {
        return 42;
    }
}

@Inject("foo")
class Bar {
    constructor(foo: Foo) {
        this.foo = foo;
    }
}

var injector = new Injector([
    bind("foo").to(Foo)
]);

var bar: Bar = injector.get(Bar);
bar.foo.getValue(); // 42
```

Bind to a simple value:

```javascript
class Foo { }

@Inject(Foo)
class Bar {
    constructor(foo: String) {
        this.foo = foo;
    }
}

var injector = new Injector([
    bind(Foo).toValue("string literal")
]);

var bar: Bar = injector.get(Bar);
bar.foo === "string literal";
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

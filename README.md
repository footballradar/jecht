# Jecht - Simple DI

_A basic dependency injection library for modern JS._

## Quickstart

Install from NPM:

`npm install jecht`

Annotate dependencies:

```
import {
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

```
var injector = new Injector();
var barService: BarService = injector.get(BarService);
barService.fooService.constructor === FooService; // true
```

Provide alternative dependencies (for mocking, etc):

```
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

```
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

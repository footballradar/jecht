/** @flow */

/**
 * Inject one or more dependencies into a class.
 *
 * Usage:
 *
 *     class Bar {}
 *
 *     class Baz {}
 *
 *     @Inject(Bar, Baz)
 *     class Foo {
 *         constructor(bar: Bar, baz: Baz) {}
 *     }
 *
 *     var injector = new Injector();
 *     var foo = injector.get(Foo);
 *
 * The Inject annotation adds metadata to a class only. To get an instance
 * of the class with dependencies injected, use the Injector service container.
 */
export function Inject(...tokens: Array<Function>): Function {
    return function(target: Function): void {
        Object.defineProperty(target, "__inject", {
            enumerable: false,
            writable: false,
            value: tokens
        });
    }
}

/**
 * Provide a version of another class. Useful for testing.
 *
 * Usage:
 *
 *     class Foo {}
 *
 *     @Provides(Foo)
 *     class MockFoo {}
 *
 *     var injector = new Injector([MockFoo]);
 *     var foo = injector.get(Foo);
 *
 * The Provides annotation adds metadata to a class only. To register a replacement
 * for an instance, use the Injector service container.
 */
export function Provides(token: Function): Function {
    return function(target: Function): void {
        Object.defineProperty(target, "__provides", {
            enumerable: false,
            writable: false,
            value: token
        });
    }
}

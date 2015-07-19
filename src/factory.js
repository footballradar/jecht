/** @flow */

/**
 * Mark dependency as a factory function to be invoked when
 * building the dependency graph.
 *
 * Usage:
 *
 *     class Foo() {}
 *
 *     class Bar() {}
 *
 *     var fooFactory = Factory.create(
 *         function fooFactory() {
 *             if (useFoo) {
 *                 return Foo;
 *             } else {
 *                 return Bar;
 *             }
 *         }
 *     );
 *
 *     @Inject(fooFactory)
 *     class Baz {
 *         constructor(foo: Foo | Bar) {}
 *     }
 *
 *     var useFoo = true;
 *     var injector = new Injector();
 *     var baz = injector.get(Baz);
 */
export class Factory {
    static create(target: Function): Function {
        Object.defineProperty(target, "__factory", {
            enumerable: false,
            writable: false,
            value: true
        });

        return target;
    }
}

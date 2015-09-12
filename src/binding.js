export class Binding {
    getProvider(): any {
        return this.provider;
    }

    setProvider(provider: any): void {
        this.provider = provider;
    }

    getTarget(): Function {
        return this.target;
    }

    setTarget(token: Function): void {
        this.target = token;
    }

    to(token: Function): Binding {
        this.setTarget(token);
        return this;
    }
}

/**
 * Bind an object or instance to a module.
 *
 * Usage:
 *
 *     class Foo {
 *
 *     }
 *
 *     @Inject(Foo)
 *     class Bar {
 *         constructor(foo: Foo) {
 *             this.foo = foo;
 *         }
 *     }
 *
 *     var fooInstance = { name: "foo", getValue() { ... } };
 *
 *     var injector = new Injector([
 *         bind(fooInstance).to(Foo)
 *     ]);
 *
 *     var bar = injector.get(Bar);
 *     bar.foo === fooInstance; // true
 */
export function bind(provider: any): Binding {
    var binding = new Binding();
    binding.setProvider(provider);
    return binding;
}

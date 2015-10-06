export class Binding {
    getProvider(): Function {
        return this.provider;
    }

    setProvider(provider: Function): void {
        this.provider = provider;
    }

    getToken(): Function {
        return this.token;
    }

    setToken(token: any): void {
        this.token = token;
    }

    to(provider: Function): Binding {
        this.setProvider(provider);
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
 *         bind(Foo).to(fooInstance)
 *     ]);
 *
 *     var bar = injector.get(Bar);
 *     bar.foo === fooInstance; // true
 */
export function bind(token: any): Binding {
    var binding = new Binding();
    binding.setToken(token);
    return binding;
}

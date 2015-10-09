const CLASS_PROVIDER = Symbol();
const VALUE_PROVIDER  = Symbol();

type Provider = {
    type: Symbol;
    value: any;
}

export class Binding {
    getProvider(): any {
        switch (this.provider.type) {
            case CLASS_PROVIDER:
                return new this.provider.value();
            default:
                return this.provider.value;
        }
    }

    setProvider(provider: Provider): void {
        this.provider = provider;
    }

    getToken(): Function {
        return this.token;
    }

    setToken(token: any): void {
        this.token = token;
    }

    to(provider: Function): Binding {
        return this.toClass(provider);
    }

    toClass(provider: Function): Binding {
        this.setProvider({
            type: CLASS_PROVIDER,
            value: provider
        });

        return this;
    }

    toValue(provider: any): Binding {
        this.setProvider({
            type: VALUE_PROVIDER,
            value: provider
        });

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

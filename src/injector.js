/** @flow */

/**
 * DI Service container.
 *
 * Basic usage:
 *
 *     class Foo {
 *
 *     }
 *
 *     var injector = new Injector();
 *     var foo = injector.get(Foo);
 *
 * Custom provider usage:
 *
 *     class Foo {
 *
 *     }
 *
 *     @Provides(Foo)
 *     class OtherFoo {
 *
 *     }
 *
 *     var injector = new Injector([OtherFoo]);
 *     var foo = injector.get(Foo);
 *     foo.constructor === OtherFoo; // true
 *
 * Each instance of Injector maintains its own internal module
 * and provider cache. To benefit from instance sharing, you should
 * create a singleton instance of this class for your application.
 */
export class Injector {
    cache: Map<Function, any>;
    providers: Map<Function, Function>;

    constructor(providers: Array<Function> = []) {
        this.cache = new Map();
        this.providers = new Map();

        providers.forEach(
            (provider) => this.registerProvider(provider)
        );
    }

    registerProvider(provider: Function): void {
        var token = provider.__provides || provider;
        this.providers.set(token, provider);
    }

    get(token: Function): any {
        return this.getOrCreate(token);
    }

    getOrCreate(token: Function): any {
        if (this.cache.has(token)) {
            return this.cache.get(token);
        }

        var provider = this.providers.has(token) ?
            this.providers.get(token) :
            token;

        if (provider.__factory) {
            provider = provider();
        }

        var dependencyTokens = provider.__inject || [];

        var dependencies = dependencyTokens.map(
            (token) => this.getOrCreate(token)
        );

        var instance = new provider(...dependencies);

        this.cache.set(token, instance);

        return instance;
    }
}

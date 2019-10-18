import { createDecorator } from 'vue-class-component'

type functionName = (data: any, k?: string) => any

export function Apollo(options?: string | any, queryName?: string | functionName): any {
    return createDecorator((componentOptions, k) => {
        if (options) {
            let def_apollo: any = {
                manual: true,
                result({ data, loading, networkStatus }: { data: any, loading: any, networkStatus: any }) {
                    if (queryName instanceof Function) {
                        this[k] = queryName(data, k)
                    } else if (Array.isArray(data[queryName || k])) {
                        this[k] = data[queryName || k]
                    } else {
                        this[k] = Object.assign({}, data[queryName || k])
                    }
                }
            };
            if (options.query) {
                def_apollo = { ...def_apollo, ...options }
            } else {
                def_apollo.query = options
            }
            ((componentOptions as any).apollo || ((componentOptions as any).apollo = {}) as any)[k] = def_apollo
        }
        /* else {
            ((componentOptions as any).apollo || ((componentOptions as any).apollo = {}) as any)[k] = componentOptions.methods[k];
            delete componentOptions.methods[k]
        } */
    })
}

export function Debounce(wait:number, immediate:boolean=false) {
    return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        var timeout:any;
        var originalMethod = descriptor.value;
        descriptor.value = function() {
            var context = this
            var args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) originalMethod.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) originalMethod.apply(context, args);
        };
        return descriptor;
    }
};

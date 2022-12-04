export function AS<T>(target: any, type: { new(...arg: any): T }): T | null {
    return target instanceof type ? target as T : null;
}
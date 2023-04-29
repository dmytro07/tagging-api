import { Type } from '@nestjs/common';

export function getMockedInstance<T>(target: Type<T>): T {
  const instance: Partial<T> = {};

  const mockMethods = (prototype: any) => {
    if (!prototype || prototype === Object.prototype) {
      return;
    }

    mockMethods(Object.getPrototypeOf(prototype));

    Object.getOwnPropertyNames(prototype).forEach((key) => {
      if (key !== 'constructor' && typeof prototype[key] === 'function') {
        instance[key] = jest.fn();
      }
    });
  };

  mockMethods(target.prototype);

  return instance as T;
}

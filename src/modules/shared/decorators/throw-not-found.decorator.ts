import { NotFoundException } from '@nestjs/common';

export function ThrowNotFound(message?: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = new Proxy(originalMethod, {
      apply: async (targetMethod, thisArg, args) => {
        const result = await Reflect.apply(targetMethod, thisArg, args);

        if (result === null || result === undefined) {
          throw new NotFoundException(message);
        }

        return result;
      },
    });
  };
}

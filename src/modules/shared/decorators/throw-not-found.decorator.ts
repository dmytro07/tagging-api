import { NotFoundException } from '@nestjs/common';

export function ThrowNotFound(message?: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      if (result === null || result === undefined) {
        throw new NotFoundException(message);
      }

      return result;
    };

    return descriptor;
  };
}

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsDateNotInFuture(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateNotInFuture',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          if (!(value instanceof Date)) {
            return false;
          }
          return value <= new Date();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} não pode ser uma data futura`;
        },
      },
    });
  };
}
import { Transform } from 'class-transformer';

interface ITransformerOptions {
  each?: boolean;
}

export function TransformInt(options?: ITransformerOptions) {
  return TransformBy(parseInt, 'string', options);
}

function TransformBy(
  method: (...options) => any,
  requireType?: string,
  options?: ITransformerOptions,
) {
  return Transform(({ value }) => {
    if (options?.each) {
      if (!Array.isArray(value)) return value;

      try {
        return value.map((v) => method(v));
      } catch (e) {
        return null;
      }
    }

    if (requireType && typeof value !== requireType) return value;

    try {
      return method(value);
    } catch (e) {
      return null;
    }
  });
}

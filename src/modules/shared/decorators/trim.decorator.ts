import { Transform } from 'class-transformer';

export const Trim = () =>
  Transform(({ value }) => value?.trim()?.replace(/\s+/gm, ' ') || value);

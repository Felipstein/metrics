export function plural(conditional: boolean, text: string, pluralSuffix: string, singularSuffix?: string) {
  const singular = singularSuffix ? text + singularSuffix : text;

  return conditional ? text + pluralSuffix : singular;
}

import { expectType } from "tsd";
import Type from "./type";

const testCard = Type({
  name: "Visa",
  digits: [13, 19],
  pattern: /^4\d{12}(\d{3}|\d{6})?$/,
  eagerPattern: /^4/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/,
});

expectType<string>(testCard.name);
expectType<RegExp>(testCard.pattern);
expectType<RegExp>(testCard.eagerPattern);

expectType<boolean>(testCard.luhn);
expectType<number | number[]>(testCard.digits);
expectType<number>(testCard.cvcLength);
expectType<RegExp>(testCard.groupPattern);
expectType<(number: string) => string[]>(testCard.group);
expectType<(number: string, eager: boolean) => boolean>(testCard.test);

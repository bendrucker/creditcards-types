interface BaseCard {
  luhn: boolean;
  digits: number | number[];
  cvcLength: number;
  groupPattern: RegExp;
  group(number: string): string[];
  test(number: string, eager: boolean): boolean;
}

interface CardData {
  name: string;
  pattern: RegExp;
  eagerPattern: RegExp;
}

export type ICardType = BaseCard & CardData;

declare function CardType(data: CardData & Partial<BaseCard>): ICardType;
export default CardType;

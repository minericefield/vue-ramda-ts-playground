type Checkable = {
  isChecked: boolean;
}

export type Item = {
  readonly id: number;
  readonly name: string;
}

export type ItemCheckable = Item & Checkable

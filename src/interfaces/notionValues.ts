export interface DropdownValue {
  values: { text: string; id: string }[];
  defaultValue: { text: string; id: string };
}

export interface DropdownValues {
  status: DropdownValue;
  estimate: DropdownValue;
  type: DropdownValue;
  priority: DropdownValue;
  sprint: DropdownValue;
}

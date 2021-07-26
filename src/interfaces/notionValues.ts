export interface InnerValue {
  text: string;
  id: string;
}

export interface DropdownValue {
  values: InnerValue[];
  defaultValue: InnerValue;
}

export interface DropdownValues {
  status: DropdownValue;
  estimate: DropdownValue;
  type: DropdownValue;
  priority: DropdownValue;
  // sprints?: dropdownValue
}

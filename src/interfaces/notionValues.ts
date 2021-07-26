export interface InnerValue {
  text: string;
  id: string;
}

export interface dropdownValue {
  values: InnerValue[];
  defaultValue: InnerValue;
}

export interface DropdownValues {
  status: dropdownValue;
  estimate: dropdownValue;
  type: dropdownValue;
  priority: dropdownValue;
  // sprints?: dropdownValue
}

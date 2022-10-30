export interface Doc {
  total_rows: number;
  offset: number;
  rows: Row[];
}

export interface Row {
  id: string;
  key: string;
  value: Value;
  doc: Task;
}

export interface Task {
  _id: string;
  value: string;
  isComplete: boolean;
  _rev: string;
}

export interface Value {
  rev: string;
}

export interface Task {
  _id: string;
  description: string;
  completed: boolean;
  priority: string;
  owner?: string;
  updatedAt?: string;
}

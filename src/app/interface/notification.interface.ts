export interface Notification {
  id?: string;
  title: string;
  body: string;
  userId: string;
  createdAt: Date;
  read: boolean;
  tag?: string;
}

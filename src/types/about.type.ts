export interface About extends Record<string, unknown> {
  intro: string;
  vision: string;
  mission: string;
  coreValue: [{ title: string; index: number }];
}

export interface About extends Record<string, unknown> {
  intro: string;
  vision: string;
  mission: string;
  coreValue?: Array<{ title: string; index?: number }>;
  core_values?: string[];
}

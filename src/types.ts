export interface UnitData {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  location: string;
  type?: string;
  model?: string;
  fuel?: string;
  drive?: string;
  warning?: string;
  os_type?: string;
  mars_sign?: string;
  sun_sign?: string;
  script?: string;
  coreProcessor?: string;
  operatingMode?: string;
  energyType?: string;
}

export interface OperatingProcedure {
  title: string;
  description: string;
}

export interface TroubleshootingItem {
  symptom: string;
  resolution: string;
}

export interface MaintenanceItem {
  frequency: string;
  task: string;
}

export interface ManualPreview {
  specifications: string;
  operatingProcedures: OperatingProcedure[];
  troubleshooting: TroubleshootingItem[];
  maintenanceSchedule: MaintenanceItem[];
}

export interface FrictionAlert {
  level: 'CRITICAL' | 'SIGNAL_LAG' | 'NOMINAL' | 'LOW_VOLTAGE';
  alert: string;
  desc: string;
}

export enum AppView {
  LOGIN = 'login',
  HOME = 'home',
  GENERATOR = 'generator',
  DASHBOARD = 'dashboard'
}

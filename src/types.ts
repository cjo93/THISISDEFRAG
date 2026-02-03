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

/** Birth data for DEFRAG engine (ISO date, HH:mm, lat/long). */
export interface BirthData {
  date: string;
  time: string;
  lat: number;
  long: number;
}

/** Single chart: gates, channels, defined centers. */
export interface ChartData {
  gates: number[];
  channels: string[];
  centers: Record<string, boolean>;
}

/** Full profile from DefragEngine.generateProfile(). */
export interface DefragUserProfile {
  uuid: string;
  charts: {
    design: ChartData;
    personality: ChartData;
    integrated: ChartData;
  };
  vectors: {
    resilience: number;
    autonomy: number;
    connectivity: number;
  };
  penta_contribution: string[];
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

// New types for Dashboard redesign
export interface UserProfile {
  name: string;
  email: string;
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
  sun_sign?: string;
  mars_sign?: string;
  rising_sign?: string;
  createdAt?: string;
}

export interface RelationshipData {
  id: string;
  name: string;
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
  sun_sign?: string;
  mars_sign?: string;
  rising_sign?: string;
  relationshipType: 'partner' | 'family' | 'friend' | 'colleague';
  compatibilityScore?: number;
  isUnlocked: boolean;
  createdAt: string;
  lastAccessed?: string;
}

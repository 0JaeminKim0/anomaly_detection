export type RiskLevel = 'high' | 'medium' | 'low' | 'normal';

export interface Material {
  code: string;
  name: string;
  supplier: string;
  avg_value: number;
  current_value: number;
  change_rate: number;
  risk_level: RiskLevel;
  unit?: string;
  valid_months?: number;
  contract_end?: string;
  extra_info?: Record<string, string | number>;
}

export interface Rule {
  id: number;
  name: string;
  description: string;
  count: number;
  percentage: number;
  icon: string;
}

export interface AnalysisSummary {
  total_materials: number;
  total_anomalies: number;
  high_risk: number;
  contract_expiring: number;
  analysis_date: string;
  total_suppliers: number;
}

export interface AgentMessage {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  step?: number;
}

export interface AnalysisStep {
  id: number;
  title: string;
  description: string;
  messages: string[];
  duration: number;
}

export interface AnalysisData {
  summary: AnalysisSummary;
  rules: Rule[];
  details: {
    rule1: Material[];
    rule2: Material[];
    rule3: Material[];
    rule4: Material[];
    rule5: Material[];
  };
}

export type AppState = 'landing' | 'processing' | 'dashboard' | 'detail';

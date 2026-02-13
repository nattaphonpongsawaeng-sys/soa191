export enum Section {
  DASHBOARD = 'dashboard',
  TIMELINE = 'timeline',
  MISSIONS = 'missions',
  STRUCTURE = 'structure',
  STRATEGY = 'strategy', // Covers Problems, Old Strategy, New Process
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface MissionItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface GovernanceItem {
  title: string;
  description: string;
}

export interface EthicsItem {
  title: string;
  description: string;
}

export interface StructureNode {
  name: string;
  role: string;
  levelTitle?: string; // e.g., "1. ระดับนโยบาย"
  relationText?: string; // e.g., "กำกับดูแล"
  children?: StructureNode[];
}

export interface StrategyItem {
  category: 'problem' | 'old_strategy' | 'new_process';
  title: string;
  items: string[];
}
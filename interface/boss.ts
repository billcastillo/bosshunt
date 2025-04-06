export interface BossProps {
  id: number;
  name: string;
  respawnHours: number;
}

export interface SavedBossProps {
  id: number;
  name: string;
  respawnHours: number;
  respawnTime: string; // ISO string format
}

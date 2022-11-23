import { UserInfo } from "./auth";
export interface GameInfo {
    name: string;
    slug: string;
    is_point_system: boolean;
    max_players: number;
    min_players: number;
  }
  export interface Player {
    score: number;
    user: UserInfo;
    winner: boolean;
  }
  export interface Match {
    game: GameInfo;
    id: number;
    players: Player[];
    inserted_at: Date;
  } 
export type Player = {
  userId: string;
  name: string;
  profilePicUrl?: string;
};

export type Room = {
  id: number;
  name: string;
  maxPlayers: number;
  hostId: number;
  started: boolean;
  ended: boolean;
  maxRound: number;
  currentRound: number;
};

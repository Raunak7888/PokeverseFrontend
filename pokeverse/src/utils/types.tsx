export type Player = {
  userId: number;
  name: string;
  profilePicUrl: string;
  score:number;
  
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


export interface WsAnswerValidationDTO {
  userId: number;
  roomId: number;
  questionId: number;
  answer: string;
  correct: boolean;
}

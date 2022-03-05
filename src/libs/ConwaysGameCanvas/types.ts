export type CleanCell = {
  live: boolean;
  color: string;
};

export type CleanBoard = CleanCell[][];

export type Player = {
  id: string;
  color: string;
};

export default {};

import { HistoryItem } from './history-item.model';

export interface Weekly extends HistoryItem {
  options: string[];
  correctOption: string;
  wrongGuesses: number;
  correctGuesses: number;
}

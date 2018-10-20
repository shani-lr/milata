import { HistoryItem } from './history-item.model';
import { Weekly } from './weekly';

export interface Words {
  weekly: Weekly;
  history: HistoryItem[];
}

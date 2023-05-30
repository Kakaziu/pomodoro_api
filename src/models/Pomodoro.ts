export interface Pomodoro {
  id: string;
  title: string;
  timeWorking: number;
  timeShortResting: number;
  timeLongResting: number;
  totalTimePomodoro: number;
  tasks: string[];
  createBy: number;
  createdAt: number;
}

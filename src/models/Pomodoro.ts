export interface Pomodoro {
  id: string;
  title: string;
  timeWorking: number;
  timeShortResting: number;
  timeLongResting: number;
  totalPomodoroCompleted: number;
  totalTimePomodoro: number;
  createBy: string;
  createdAt: number;
}

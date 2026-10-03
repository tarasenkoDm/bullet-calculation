export interface IBulletResults {
  gora1: number;
  gora2: number;
  gora3: number;
  bullet1: number;
  bullet2: number;
  bullet3: number;
  leftVists1: number;
  leftVists2: number;
  leftVists3: number;
  rightVists1: number;
  rightVists2: number;
  rightVists3: number;
}

export interface ICalculations {
  results: IBulletResults,
  leftFinalVists1: number;
  leftFinalVists2: number;
  leftFinalVists3: number;
  rightFinalVists1: number;
  rightFinalVists2: number;
  rightFinalVists3: number;
  total1: number;
  total2: number;
  total3: number;
}

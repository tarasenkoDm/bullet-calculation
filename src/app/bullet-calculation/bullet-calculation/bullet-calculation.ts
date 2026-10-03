import { Component, signal } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ICalculations, IBulletResults } from '../model/IBulletResults';
import { form, FormField } from '@angular/forms/signals';


const INITIAL_BULLET_RESULTS: IBulletResults = {
  gora1: 0,
  gora2: 0,
  gora3: 0,
  bullet1: 0,
  bullet2: 0,
  bullet3: 0,
  leftVists1: 0,
  leftVists2: 0,
  leftVists3: 0,
  rightVists1: 0,
  rightVists2: 0,
  rightVists3: 0,
};

const INITIAL_CALCULATIONS: ICalculations = {
  results: { ...INITIAL_BULLET_RESULTS },
  leftFinalVists1: 0,
  leftFinalVists2: 0,
  leftFinalVists3: 0,
  rightFinalVists1: 0,
  rightFinalVists2: 0,
  rightFinalVists3: 0,
  total1: 0,
  total2: 0,
  total3: 0,
};

@Component({
  selector: 'app-bullet-calculation',
  imports: [NgOptimizedImage, FormField, NgClass],
  templateUrl: './bullet-calculation.html',
  styleUrl: './bullet-calculation.scss',
})
export class BulletCalculation {
  inProcess = signal(false);
  bulletModel = signal<IBulletResults>({ ...INITIAL_BULLET_RESULTS });

  bulletForm = form(this.bulletModel);

  calculationObj: ICalculations = { ...INITIAL_CALCULATIONS };

  calculate(): void {
    this.resetResultsObj();
    this.calculationObj.results = { ...this.bulletForm().value() };

    const bullet1 = this.calculationObj.results.bullet1;
    const bullet2 = this.calculationObj.results.bullet2;
    const bullet3 = this.calculationObj.results.bullet3;

    if (!this.isEqual(bullet1, bullet2, bullet3)) {
      const largestNum = this.largestNumber(bullet1, bullet2, bullet3);
      this.bulletEqualization(largestNum, bullet1, bullet2, bullet3);
    }

    const gora1 = this.calculationObj.results.gora1;
    const gora2 = this.calculationObj.results.gora2;
    const gora3 = this.calculationObj.results.gora3;

    if (!this.isEqual(gora1, gora2, gora3)) {
      const smallestNum = this.smallestNumber(gora1, gora2, gora3);
      this.goraEqualization(smallestNum, gora1, gora2, gora3);
    }
    this.finalVistsCalculation();
    this.inProcess.set(true);
  }

  reset(): void {
    this.inProcess.set(false);
    this.bulletModel.set({ ...INITIAL_BULLET_RESULTS });
    this.resetResultsObj();
  }

  resetResultsObj(): void {
    this.calculationObj = { ...INITIAL_CALCULATIONS };
  }

  isEqual(num1: number, num2: number, num3: number): boolean {
    return num1 === num2 && num1 === num3;
  }

  largestNumber(num1: number, num2: number, num3: number): number {
    return Math.max(num1, num2, num3);
  }

  smallestNumber(num1: number, num2: number, num3: number): number {
    return Math.min(num1, num2, num3);
  }

  bulletEqualization(largestBullet: number, bullet1: number, bullet2: number, bullet3: number): void {
    if (largestBullet > bullet1) {
      this.calculationObj.results.gora1 += largestBullet - bullet1;
    }
    if (largestBullet > bullet2) {
      this.calculationObj.results.gora2 += largestBullet - bullet2;
    }
    if (largestBullet > bullet3) {
      this.calculationObj.results.gora3 += largestBullet - bullet3;
    }
  }

  goraEqualization(smallestGora: number, gora1: number, gora2: number, gora3: number): void {
    if (smallestGora < gora1) {
      const compensation = this.compensationCalculation(gora1, smallestGora);
      this.calculationObj.results.rightVists2 += compensation;
      this.calculationObj.results.leftVists3 += compensation;
    }

    if (smallestGora < gora2) {
      const compensation = this.compensationCalculation(gora2, smallestGora);
      this.calculationObj.results.leftVists1 += compensation;
      this.calculationObj.results.rightVists3 += compensation;
    }

    if (smallestGora < gora3) {
      const compensation = this.compensationCalculation(gora3, smallestGora);
      this.calculationObj.results.rightVists1 += compensation;
      this.calculationObj.results.leftVists2 += compensation;
    }
  }

  compensationCalculation (gora: number, smallestGora: number): number {
    return  Math.ceil(((gora - smallestGora) * 10) / 3);
  };

  finalVistsCalculation(): void {
    this.calculationObj.leftFinalVists1 =
      this.calculationObj.results.leftVists1 - this.calculationObj.results.rightVists2;
    this.calculationObj.rightFinalVists2 = this.calculationObj.leftFinalVists1 * -1;
    this.calculationObj.rightFinalVists1 =
      this.calculationObj.results.rightVists1 - this.calculationObj.results.leftVists3;
    this.calculationObj.leftFinalVists3 = this.calculationObj.rightFinalVists1 * -1;
    this.calculationObj.leftFinalVists2 =
      this.calculationObj.results.leftVists2 - this.calculationObj.results.rightVists3;
    this.calculationObj.rightFinalVists3 = this.calculationObj.leftFinalVists2 * -1;

    this.calculationObj.total1 = this.calculationObj.leftFinalVists1 + this.calculationObj.rightFinalVists1;
    this.calculationObj.total2 = this.calculationObj.leftFinalVists2 + this.calculationObj.rightFinalVists2;
    this.calculationObj.total3 = this.calculationObj.leftFinalVists3 + this.calculationObj.rightFinalVists3;
  }
}

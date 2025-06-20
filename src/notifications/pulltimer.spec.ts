import {PullTimer} from './pulltimer';
import { expect, beforeAll, afterAll, it, describe, test } from '@jest/globals';

describe('PullTimer', () => {
  describe('execution', () => {
    let pullTimer: PullTimer;
    let value: number | undefined;
    beforeAll(() => {

      pullTimer = new PullTimer(
        console.log,
        200,
        (callback: (err: any, result: number) => void) => callback(null, value ? value + 1 : 1),
        (v: number) => value = v
      );
      pullTimer.start();
    });
    afterAll(() => {
      pullTimer.stop();
      value = undefined;
    });

    test('undefined before timer was executed', () => {
      expect(value).toBeUndefined();
    });

    test('should be greater equal 1 after 200ms', (done) => {
      setTimeout(() => {
        expect(value).toBeGreaterThanOrEqual(1)
        done()
      }, 200)
    })
  });

  describe('reset', () => {
    let pullTimer: PullTimer;
    let value: number | undefined;
    beforeAll(() => {
      pullTimer = new PullTimer(
        console.log,
        200,
        (callback: (err: any, result: number) => void) => callback(null, value ? value + 1 : 1),
        (v: number) => value = v
      );
      pullTimer.start();
    });
    afterAll(() => {
      pullTimer.stop();
      value = undefined;
    });

    it('should be 1 only after execution of 7ms when resetting timer after 2ms', (done) => {
      expect(value).toBeUndefined();

      setTimeout(() => {
        expect(value).toBeUndefined();
        pullTimer.resetTimer(); // reset means timer runs another 200 ms

        setTimeout(() => {
          expect(value).toBeUndefined();
          setTimeout(() => {
            expect(value).toEqual(1);
            done();
          }, 150);
        }, 100);
      }, 50);
    });
  })
});

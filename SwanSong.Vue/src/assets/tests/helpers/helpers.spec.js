import { ownKeys } from 'core-js/fn/reflect';
import { getPages } from './helpers'

describe('getPages', () => {
  test('gets 5 pages from 10 items', () => {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(getPages(list)).len().toBe(5)
  })

  // test('does not increment the current number over the max', () => {
  //   expect(getPages(10, 10)).toBe(10)
  // })

  // test('has a default max of 10', () => {
  //   expect(increment(10)).toBe(10)
  // })
})
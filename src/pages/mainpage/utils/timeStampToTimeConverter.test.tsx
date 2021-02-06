import { timeStampToTimeConverter } from "./timeStampToTimeConverter"

describe('timeStampToTimeConverter', () => {
  test('should return a date when the timestamp is different then today', () => {
    const returned = timeStampToTimeConverter(1610646657681)
    expect(returned).toContain('14')
    expect(returned).toContain('01')
    expect(returned).toContain('2021')
  })
  test('should return an hour when timestamp is equal today', () => {
    const now = new Date()
    now.setHours(20)
    const returned = timeStampToTimeConverter(now.getTime())
    expect(returned).toContain('PM')
  })
})
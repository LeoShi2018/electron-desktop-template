/**
 * 工具函数测试
 * 测试基础工具函数
 */

describe('基础工具函数', () => {
  describe('字符串工具', () => {
    test('应该正确处理空字符串', () => {
      const isEmpty = (str: string) => str.length === 0
      
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('test')).toBe(false)
    })

    test('应该正确格式化字符串', () => {
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
      
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('WORLD')).toBe('WORLD')
      expect(capitalize('')).toBe('')
    })
  })

  describe('数字工具', () => {
    test('应该正确格式化数字', () => {
      const formatNumber = (num: number, decimals: number = 2) => {
        return Number(num.toFixed(decimals))
      }
      
      expect(formatNumber(3.14159, 2)).toBe(3.14)
      expect(formatNumber(10, 0)).toBe(10)
      expect(formatNumber(1.999, 1)).toBe(2.0)
    })

    test('应该正确验证数字范围', () => {
      const isInRange = (num: number, min: number, max: number) => {
        return num >= min && num <= max
      }
      
      expect(isInRange(5, 1, 10)).toBe(true)
      expect(isInRange(0, 1, 10)).toBe(false)
      expect(isInRange(15, 1, 10)).toBe(false)
    })
  })

  describe('日期工具', () => {
    test('应该正确格式化日期', () => {
      const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0]
      }
      
      const testDate = new Date('2025-07-18T10:00:00.000Z')
      expect(formatDate(testDate)).toBe('2025-07-18')
    })

    test('应该正确计算日期差', () => {
      const daysDiff = (date1: Date, date2: Date) => {
        const diffTime = Math.abs(date2.getTime() - date1.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      }
      
      const date1 = new Date('2025-07-18')
      const date2 = new Date('2025-07-20')
      expect(daysDiff(date1, date2)).toBe(2)
    })
  })

  describe('对象工具', () => {
    test('应该正确深拷贝对象', () => {
      const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj))
      
      const original = { a: 1, b: { c: 2 } }
      const cloned = deepClone(original)
      
      cloned.b.c = 3
      expect(original.b.c).toBe(2)
      expect(cloned.b.c).toBe(3)
    })

    test('应该正确合并对象', () => {
      const merge = (target: any, source: any) => ({ ...target, ...source })
      
      const obj1 = { a: 1, b: 2 }
      const obj2 = { b: 3, c: 4 }
      const result = merge(obj1, obj2)
      
      expect(result).toEqual({ a: 1, b: 3, c: 4 })
    })
  })

  describe('数组工具', () => {
    test('应该正确去重数组', () => {
      const unique = (arr: any[]) => [...new Set(arr)]
      
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
    })

    test('应该正确分组数组', () => {
      const groupBy = (arr: any[], key: string) => {
        return arr.reduce((groups, item) => {
          const group = item[key]
          groups[group] = groups[group] || []
          groups[group].push(item)
          return groups
        }, {})
      }
      
      const data = [
        { type: 'A', value: 1 },
        { type: 'B', value: 2 },
        { type: 'A', value: 3 }
      ]
      
      const grouped = groupBy(data, 'type')
      expect(grouped.A).toHaveLength(2)
      expect(grouped.B).toHaveLength(1)
    })
  })
})

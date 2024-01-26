import { makeReport } from '@/test/factories/report-factory'
import { InMemoryReportsRepository } from '@/test/repositories/in-memory-reports-repository'

import { ListReports } from './list-reports'

describe('ListReports', () => {
  let sut: ListReports
  let inMemoryReportsRepo: InMemoryReportsRepository

  beforeEach(() => {
    inMemoryReportsRepo = new InMemoryReportsRepository()
    sut = new ListReports(inMemoryReportsRepo)
  })

  it('fetches all reports from user', async () => {
    const userId = 'any-user-id'
    inMemoryReportsRepo.items.push(makeReport({ userId }), makeReport())

    const response = await sut.execute({ userId })
    expect(response).toEqual({ reports: [inMemoryReportsRepo.items[0]] })
  })
})

import { Injectable } from '@nestjs/common'

import { Report, ReportStatus } from '@/report/report.entity'
import {
  CreateReportInput,
  ReportsRepository,
  UpdateReportInput,
} from '@/report/report.repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaReportsRepository extends ReportsRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(report: CreateReportInput): Promise<Report> {
    const newReport = await this.prisma.report.create({ data: report })
    return { ...newReport, status: newReport.status as ReportStatus }
  }

  async fetchByUserId(userId: string): Promise<Report[]> {
    const reports = await this.prisma.report.findMany({ where: { userId } })
    return reports.map((report) => ({
      ...report,
      status: report.status as ReportStatus,
    }))
  }

  async update(id: string, report: UpdateReportInput): Promise<Report> {
    const updatedReport = await this.prisma.report.update({
      where: { id },
      data: report,
    })

    return { ...updatedReport, status: updatedReport.status as ReportStatus }
  }
}

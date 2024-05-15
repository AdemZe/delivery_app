import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async getAllJobs() {
    return this.jobService.findAllJobs();
  }

  @Get(':id')
  async getAllJobById(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.findAllJobById(id);
  }

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    return await this.jobService.addJob(createJobDto);
  }

  @Delete(':id')
  async deleteJob(@Param('id', ParseIntPipe) id: number) {
    return await this.jobService.removeJob(id);
  }

  @Patch(':id')
  async updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateJobDto: UpdateJobDto,
  ) {
    return await this.jobService.updateJob(id, updateJobDto);
  }
}

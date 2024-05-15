import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from 'src/typeorm/job.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[ TypeOrmModule.forFeature([JobEntity]), UsersModule],
  controllers: [JobController],
  providers: [JobService],
  exports:[TypeOrmModule],
})
export class JobModule {}

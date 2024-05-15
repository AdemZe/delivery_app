import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from 'src/typeorm/job.entity';
import { UserEntity } from 'src/typeorm/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobDto } from './dto/job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepo: Repository<JobEntity>,

    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,

    private readonly usersService: UsersService,
  ) {}

  async findAllJobs():Promise<JobDto[]>{
    return await this.jobRepo.find();
  }

  async findAllJobById(id: number):Promise<JobDto> {
    const job = await this.jobRepo.findOneBy({ id });
    if (!job) {
      throw new NotFoundException(' job not exist ');
     } else{
      return job.toJobDto()
    }
  }

  async addJob(createJobDto: CreateJobDto ,) :Promise<JobDto> {
    const newJob = await this.jobRepo.create({ 
      ...createJobDto,
    });
    
    await this.jobRepo.save(newJob);
    return newJob.toJobDto();
        


  }

  async removeJob(id: number) {
    const job = this.findAllJobById(id);
    if (job) {
      try {
        await this.jobRepo.delete(id);
        return `suppression de job avec l'id = ${id} `;
      } catch (e) {
        throw new InternalServerErrorException(
          'un erreur se prouit coté serveur ',
        );
      }
    }
  }

  async updateJob(id: number, updateJobDto: UpdateJobDto) {
    const job = this.findAllJobById(id);
    if (job) {
      try {
        const jobUpdated = await this.jobRepo.preload({
          id,
          ...updateJobDto,
        });
        this.jobRepo.save(jobUpdated);
        return jobUpdated.toJobDto();
      } catch (e) {
        throw new InternalServerErrorException(
          'un erreur se prouit coté serveur ',
        );
      }
    }
  }
}

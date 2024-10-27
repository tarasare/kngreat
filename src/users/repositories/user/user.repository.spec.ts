import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserService } from 'src/users/services/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

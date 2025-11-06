import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    await this.userRepository.update(userId, { role });
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
  }

  async getAllAdmins(): Promise<User[]> {
    return this.getUsersByRole(UserRole.ADMIN);
  }

  async getAllCustomers(): Promise<User[]> {
    return this.getUsersByRole(UserRole.CUSTOMER);
  }

  async getAllDrivers(): Promise<User[]> {
    return this.getUsersByRole(UserRole.DRIVER);
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user?.role === UserRole.ADMIN;
  }

  async isUserDriver(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user?.role === UserRole.DRIVER;
  }

  async isUserCustomer(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user?.role === UserRole.CUSTOMER;
  }
}
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRoleService } from './user-role.service';
import { User, UserRole } from './user.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './dto/auth-response.type';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Roles } from '@/decorators/roles.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
  ) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.userService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<AuthResponse> {
    return this.userService.register(registerInput);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async usersByRole(
    @Args('role', { type: () => UserRole }) role: UserRole,
  ): Promise<User[]> {
    return this.userRoleService.getUsersByRole(role);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUserRole(
    @Args('userId') userId: string,
    @Args('role', { type: () => UserRole }) role: UserRole,
  ): Promise<User> {
    return this.userRoleService.updateUserRole(userId, role);
  }
}
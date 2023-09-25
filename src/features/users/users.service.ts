import { v4 as uuidv4 } from 'uuid';
import {
  EntityWithPaginationType,
  UserType,
  UserViewType,
} from '../../types/types';
import { addHours } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../../infrastructure/notification/email.service';
import { AuthService } from '../auth/auth.service';
import { emailTemplateService } from '../../infrastructure/notification/email.manager';
import jwt from 'jsonwebtoken';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  async getUsers(page: number, pageSize: number, searchNameTerm: string) {
    const users = await this.usersRepository.getUsers(
      page,
      pageSize,
      searchNameTerm,
    );
    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.getUserById(id);
    return user;
  }

  async createUser(
    login: string,
    password: string,
    email: string,
  ): Promise<UserViewType | null> {
    const passwordHash = await this.authService._generateHash(password);
    const newUser: UserType = {
      accountData: {
        id: uuidv4(),
        login: login,
        email: email,
        passwordHash,
        createdAt: new Date(),
      },
      // loginAttempts: [],
      emailConfirmation: {
        //sentEmails: [],
        confirmationCode: uuidv4(),
        expirationDate: addHours(new Date(), 24),
        isConfirmed: false,
      },
    };
    const createdUser = await this.usersRepository.createUser(newUser);
    if (createdUser) {
      const messageBody = emailTemplateService.getEmailConfirmationMessage(
        createdUser.emailConfirmation.confirmationCode,
      );
      await this.emailService.addMessageInQueue({
        email: newUser.accountData.email,
        message: messageBody,
        subject: 'E-mail confirmation ',
        isSent: false,
        createdAt: new Date(),
      });
      return {
        id: createdUser.accountData.id,
        login: createdUser.accountData.login,
      };
    } else {
      return null;
    }
  }

  async deleteUserById(id: string): Promise<boolean> {
    return await this.usersRepository.deleteUserById(id);
  }

  async addRevokedToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY;
    try {
      const decoded: any = jwt.verify(token, secretKey!);
      const updatedUser = this.usersRepository.addRevokedToken(
        decoded.userId,
        token,
      );
      return updatedUser;
    } catch (e) {
      console.log('Decoding error: e');
      return null;
    }
  }
}

export interface IUsersRepository {
  getUsers(
    page: number,
    pageSize: number,
    searchNameTerm: string,
  ): Promise<EntityWithPaginationType<UserViewType[]>>;

  createUser(newUser: UserType): Promise<UserType | null>;

  deleteUserById(id: string): Promise<boolean>;

  findUserById(id: string): Promise<UserType | null>;

  addRevokedToken(id: string, token: string): Promise<UserType | null>;
}

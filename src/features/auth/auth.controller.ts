import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Request,
  Res,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegistrationDto} from './dto/registration.dto';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {UsersService} from '../users/users.service';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  DocumentBuilder
} from "@nestjs/swagger";
import {RegistrationConfirmationDto} from "./dto/registration-confirmation.dto";
import {EmailResendingDto} from "./dto/email-resending.dto";
import {LoginDto} from "./dto/login.dto";

@ApiBearerAuth('Auth')
@ApiTags('Auth') // Tagging the Controller
@Controller('auth')

export class AuthController {
  constructor(

    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {

  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({summary: 'Get User Data'})
  @ApiBearerAuth() // Specifying that this route uses Bearer token for authentication
  @ApiResponse({status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  async getUserData(@Request() req) {
    const userId = req.user.userId;
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException();
    return {
      email: user.accountData.email,
      login: user.accountData.login,
      userId,
    };
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({summary: 'Login'})
  @ApiBody({type: LoginDto}) // Assuming this is the correct DTO for login as well
  @ApiResponse({status: 200, description: 'Logged in'})
  async login(@Request() req, @Res({passthrough: true}) res) {
    const userData = req.user.data;
    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return {accessToken: req.user.data.accessToken};
  }

  @Post('registration')
  @ApiOperation({summary: 'User Registration'})
  @ApiBody({type: RegistrationDto})
  @ApiResponse({status: 201, description: 'Registered successfully'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  async registration(@Body() registrationData: RegistrationDto) {
    const user = await this.usersService.createUser(
      registrationData.login,
      registrationData.password,
      registrationData.email,
    );
    return;
  }

  @Post('registration-confirmation')
  @ApiOperation({summary: 'Confirm Registration'})
  @ApiBody({description: 'Confirmation Code', type: RegistrationConfirmationDto})
  @ApiResponse({status: 201, description: 'Email confirmed'})
  @ApiResponse({status: 404, description: 'Not Found'})
  async confirmRegistration(@Body('code') confirmationCode) {
    const result = await this.authService.confirmEmail(confirmationCode);
    if (!result) {
      throw new NotFoundException();
    }
    return null;
  }

  @Post('registration-email-resending')
  @ApiOperation({summary: 'Resend Registration Email'})
  @ApiBody({description: 'Email', type: EmailResendingDto})
  @ApiResponse({status: 200, description: 'Email resent'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  async resendRegistrationEmail(@Body('email') email: string) {
    const isResented = await this.authService.resendCode(email);
    if (!isResented)
      throw new BadRequestException({
        message: 'email already confirmed or such email not found',
        field: 'email',
      });
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({summary: 'Logout'})
  @ApiBearerAuth() // Specifying that this route uses Bearer token for authentication
  @ApiResponse({status: 200, description: 'Logged out'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  async logout(@Request() req) {
    if (!req.cookie?.refreshToken) throw new UnauthorizedException();
    await this.usersService.addRevokedToken(req.cookie.refreshToken);
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  @ApiOperation({summary: 'Refresh Token'})
  @ApiBearerAuth() // Specifying that this route uses Bearer token for authentication
  @ApiResponse({status: 200, description: 'Token refreshed'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  async refreshToken(@Request() req, @Response() res) {
    if (!req.cookie?.refreshToken) throw new UnauthorizedException();
    const userId = req.user.id;
    const newTokens = this.authService.createJwtTokensPair(userId, null);
    res.cookie('refreshToken', newTokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return {accessToken: newTokens.accessToken};
  }
}

import { Body, ClassSerializerInterceptor, Controller, Patch, Post, UseInterceptors, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "../service/auth.user.service";
import { Email } from "src/common/dto/email.dto";
import { CreateUserDto } from "src/modules/users/dto/createUser.dto";
import { LoginDto } from "src/common/dto/login.dto";
import { UserConnection } from "src/modules/users/models/user-connection.model";
import { UpdatePasswordDto } from "src/common/dto/update-password.dto";

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({ type: Email })
  async signUp(@Body() dto: CreateUserDto): Promise<Email> {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @ApiOkResponse({ type: UserConnection })
  async login(@Body() dto: LoginDto): Promise<UserConnection> {
    return this.authService.login(dto);
  }

  @Patch('update-password')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Password updated successfully' })
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.authService.updatePassword(
      req.user.sub, // Using sub from JWT payload as user ID
      updatePasswordDto.currentPassword,
      updatePasswordDto.newPassword,
    );
    return { message: 'Password updated successfully' };
  }
}

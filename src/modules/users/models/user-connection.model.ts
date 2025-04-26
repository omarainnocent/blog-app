import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class UserConnection {
  @ApiProperty({ type: UserEntity })
  data: UserEntity;

  @ApiProperty()
  accessToken: string;
}

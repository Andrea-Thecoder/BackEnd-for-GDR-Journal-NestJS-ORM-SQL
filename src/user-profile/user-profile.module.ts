import { Module } from '@nestjs/common';
import { UserProfileService } from './service/user-profile.service';
import { UserProfileController } from './controller/user-profile.controller';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}

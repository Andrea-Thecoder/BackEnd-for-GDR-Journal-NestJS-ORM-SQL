import { Module } from '@nestjs/common';
import { UserProfileService } from './service/user-profile.service';
import { UserProfileController } from './controller/user-profile.controller';
import { UserProfile } from './entities/user-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports:[UserProfileService]
})
export class UserProfileModule {}

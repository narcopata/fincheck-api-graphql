import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { DatabaseModule } from '~shared/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from '~shared/config/env';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: {
        expiresIn: env.jwtSessionExpiresIn,
      },
    }),
  ],
})
export class AuthModule {}

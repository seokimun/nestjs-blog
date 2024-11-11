import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from '../cats/cats.module';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (env: ConfigService) => ({
                secret: env.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: env.get<string>('JWT_EXPIRES_IN') },
            }),
        }),
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        CatsModule,
        UsersModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}

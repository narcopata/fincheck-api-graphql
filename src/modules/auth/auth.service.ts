import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from '~shared/config/env';
import { UsersRepository } from '~shared/database/repositories/users/users.repository';
import { SignUpInputDTO } from './dto/signup.input.dto';
import { argon2id, hash, verify } from 'argon2';
import { SignInInputDTO } from './dto/signin.input.dto';

type AccessTokenType = {
  accessToken: string;
};

abstract class AuthServiceAbstract {
  abstract generateAccessToken(sub: string): Promise<string>;
  abstract signup(dto: SignUpInputDTO): Promise<AccessTokenType>;
  abstract signin(dto: SignInInputDTO): Promise<AccessTokenType>;
}

@Injectable()
export class AuthService extends AuthServiceAbstract {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  public generateAccessToken = async (sub: string): Promise<string> => {
    return this.jwtService.signAsync(
      {
        sub,
      },
      {
        secret: env.jwtSecret,
      },
    );
  };

  public async signup(dto: SignUpInputDTO): Promise<AccessTokenType> {
    const userWithEmailFromDb = await this.usersRepository.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userWithEmailFromDb) {
      throw new ConflictException(
        'Um usuário com este email já está cadastrado',
      );
    }

    const hashedPassword = await hash(dto.password, {
      type: argon2id,
      hashLength: 40,
    });

    const user = await this.usersRepository.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  public async signin({
    email,
    password,
  }: SignInInputDTO): Promise<AccessTokenType> {
    const user = await this.usersRepository.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await verify(user.password, password, {
      type: argon2id,
      hashLength: 40,
    });

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }
}

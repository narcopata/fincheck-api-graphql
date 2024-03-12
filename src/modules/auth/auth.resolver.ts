import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IsPublic } from '~shared/decorators/IsPublic';
import { SignUpResponseDTO } from './dto/signup.response.dto';
import { SignUpInputDTO } from './dto/signup.input.dto';
import { SignInInputDTO } from './dto/signin.input.dto';
import { SignInResponseDTO } from './dto/signin.response.dto';

@IsPublic()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => SignUpResponseDTO, {
    name: 'signup',
  })
  async signup(
    @Args('signupDto')
    signupDto: SignUpInputDTO,
  ) {
    return this.authService.signup(signupDto);
  }

  @Query(() => SignInResponseDTO, {
    name: 'signin',
  })
  async signin(
    @Args('signinDto')
    signinDto: SignInInputDTO,
  ) {
    return this.authService.signin(signinDto);
  }
}

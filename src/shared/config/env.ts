import { IsNotEmpty, IsString, validateSync } from 'class-validator';

type EnvType<K extends string> = {
  [Key in K]: string;
};

type EnvKeys = 'jwtSecret' | 'jwtSessionExpiresIn';

class Env implements EnvType<EnvKeys> {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  jwtSessionExpiresIn: string;
}

const env = new Env();

env.jwtSecret = process.env.JWT_SECRET;
env.jwtSessionExpiresIn = process.env.JWT_SESSION_EXPIRES_IN;

export { env };

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}

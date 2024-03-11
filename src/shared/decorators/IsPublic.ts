import { SetMetadata } from '@nestjs/common';
import { METADATA_TOKENS } from '~shared/metadataTokens';

export const IsPublic = () => SetMetadata(METADATA_TOKENS.IS_PUBLIC, true);

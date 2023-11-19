import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetSessionInfo = createParamDecorator(
  (_data, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().session,
);

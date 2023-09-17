import { NotFoundException } from '@nestjs/common';
import { ErrorCodesEnum } from 'src/enums/error-codes.enum';

export function throwBookNotFound(id: string): never {
  throw new NotFoundException({
    message: `Book with id: ${id} was not found`,
    errorCode: ErrorCodesEnum.BOOK_NOT_FOUND,
    errorDetails: {
      id,
    },
  });
}

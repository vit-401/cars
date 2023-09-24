import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParamIdValidationPipe implements PipeTransform<any> {
  async transform(value: string, metadata: ArgumentMetadata) {
    debugger;
    if (metadata.type === 'param') {
      return value.toString();
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(
        'field does not suitable for ObjectId format',
      );
    }
    return value;
  }
}

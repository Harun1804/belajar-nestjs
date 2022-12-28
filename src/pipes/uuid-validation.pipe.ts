import {BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {isUUID} from "class-validator";

@Injectable()
export class UuidValidationPipe implements PipeTransform {
    transform(value: any): any {
        if(!isUUID(value, 4)){
            throw new BadRequestException(`Value ${value} is not valid UUID`);
        }
        return value;
    }
}
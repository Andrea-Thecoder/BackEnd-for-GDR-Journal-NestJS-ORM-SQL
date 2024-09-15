import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeHtmlPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
        try{
            if(metadata.type !== "body") return value;
            if (typeof value === 'string') {
            return this.sanitizeValue(value);
            } else if (typeof value === 'object' && value !== null) {
            return this.sanitizeObject(value);
            }
            return value;
        }
        catch (error){
            console.error('Error during sanitization: ', error);
        throw new BadRequestException('Invalid input for sanitization');
    }
  }
  private sanitizeValue(value: string): string {
    return sanitizeHtml(value, {
        //allowdtags serve per indicare quali tag possono essere inwhitelsit quindi passano icontrolli possiam oanceh definire gli attributi per questi tag.
      allowedTags: ['b','i','u'], 
      allowedAttributes: {} 
    });
  }

  private sanitizeObject(obj: any): any {
    const sanitizedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitizedObj[key] = typeof obj[key] === 'string' 
          ? this.sanitizeValue(obj[key]) 
          : obj[key]; // Sanifica solo le stringhe
      }
    }
    return sanitizedObj;
  }
}
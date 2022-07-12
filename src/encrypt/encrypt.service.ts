import { DecryptDto } from './dto/decrypt.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const crypto = require('crypto');
@Injectable()
export class EncryptService {
  constructor(private readonly config: ConfigService) {}

  private authTagLength = 16;

  async encrypt(text: string) {
    try {
      let key = Buffer.from(`${this.config.get('ENCRYPTION_KEY')}`, 'utf-8');
      let iv = Buffer.from(`${this.config.get('ENCRYPTION_IV')}`, 'hex');
      let secret = Buffer.from(text, 'utf-8');
      let cipher = crypto.createCipheriv('aes-256-gcm', key, iv, {
        authTagLength: this.authTagLength,
      });
      let encryptedData = Buffer.concat([
        cipher.update(secret),
        cipher.final(),
        cipher.getAuthTag(),
      ]);

      let dataToDecrypt = encryptedData.slice(
        0,
        encryptedData.length - this.authTagLength,
      );

      let authTag = encryptedData.slice(
        encryptedData.length - this.authTagLength,
        encryptedData.length,
      );

      return {
        dataToDecrypt: dataToDecrypt.toString('base64'),
        authTag: authTag.toString('base64'),
      };
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException();
    }
  }

  async decrypt(body: DecryptDto) {
    try {
      let key = Buffer.from(`${this.config.get('ENCRYPTION_KEY')}`, 'utf-8');
      let iv = Buffer.from(`${this.config.get('ENCRYPTION_IV')}`, 'hex');
      let authTag = Buffer.from(body.authTag, 'base64');
      let dataToDecrypt = Buffer.from(body.dataToDecrypt, 'base64');

      let decipher = crypto.createDecipheriv('aes-256-gcm', key, iv, {
        authTagLength: this.authTagLength,
      });
      decipher.setAuthTag(authTag);
      let decryptedData = Buffer.concat([
        decipher.update(dataToDecrypt),
        decipher.final(),
      ]);
      return decryptedData.toString('utf-8');
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException();
    }
  }
}

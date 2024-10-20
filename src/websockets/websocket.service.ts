import { Injectable } from '@nestjs/common';
import { LanguagesService } from '../languages/languages.service';
import { CreateLanguageDto } from '../languages/dto/create-language.dto';

@Injectable()
export class WebsocketService {
    constructor(private readonly languagesServices: LanguagesService,) { }

    findAll() {
        return this.languagesServices.findAll();
    }

    async createLanguage(createLanguageDto: CreateLanguageDto, userId: number) {
        const language = await this.languagesServices.create(createLanguageDto, userId);
        return language
    }

}

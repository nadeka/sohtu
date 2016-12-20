import { ErrorHandler, Injectable } from "@angular/core";
import { LoggerService } from '../services/logger/logger.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    constructor(private logger: LoggerService) {}

    handleError(error: any): void {
        this.logger.createLogMessage(error)
            .then(res => console.log('CustomErrorHandler: Log message successfully created'))
            .catch(err => console.log('CustomErrorHandler: Could not create log message'));

    }
}

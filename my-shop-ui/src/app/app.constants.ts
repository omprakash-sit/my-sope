import { environment } from '../environments/environment';
import { VERSION } from '@angular/core';

export const ANGULAR_VERSION = VERSION;
export const DEBUG_INFO_ENABLED = !environment.production;
export const SERVER_API_URL = environment.apiUrl;
export const BUILD_TIMESTAMP = environment.timeStamp;
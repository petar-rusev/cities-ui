import { ApiServiceConfig } from "../helper/ApiServiceConfig";

/**
 * AppSettings class contains application-wide settings and constants.
 */
export class AppSettings {
    private appConfig: ApiServiceConfig;

    constructor(appConfig: ApiServiceConfig) {
        this.appConfig = appConfig;
    }

    public getServiceUrl(): string {
        // Detecting if the application is running on localhost
        const isLocal = window.location.href.indexOf("localhost") !== -1;

        // Returning the appropriate URL
        return isLocal ? this.appConfig.local : this.appConfig.cloud;
    }
}

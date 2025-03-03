import * as express from 'express';
export declare class ExpressAppConfig {
    private app;
    private definitionPath;
    private routingOptions;
    constructor(definitionPath: string, routingOptions: any);
    addValidator(): void;
    getApp(): express.Application;
}

export default interface VrtOptions {
    apiUrl: string;
    project: string;
    apiKey: string;
    branchName: string;
    diffTolerancePercent: number;
    enableSoftAssert?: boolean;
    ciBuildId?: string;
}

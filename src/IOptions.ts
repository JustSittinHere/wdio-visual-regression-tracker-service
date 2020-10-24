export default interface IOptions {
    apiUrl: string;
    project: string;
    apiKey: string;
    branchName: string;
    diffTolerancePercent: number;
    enableSoftAssert: boolean;
}

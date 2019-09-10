export interface IManagementStatus {
    apiKeyAccepted: boolean;
    apiNonceAccepted: boolean;
    apiSignatureAccepted: boolean;
    ipAccepted: boolean;
    requestsRemaining: number;
}
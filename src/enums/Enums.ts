/**
 * Enums global object, exports all domains used within the system.
 */
export const Enums = {
  Status: {
    Active: 'active',
    Arquived: 'archived',
    Canceled: 'cancelled',
    Completed: 'completed',
    Deleted: 'deleted',
    InProgress: 'in_progress',
    InReview: 'in_review',
    OnHold: 'on_hold',
    Pending: 'pending',
    Reopened: 'reopened',
    WaitingForReview: 'waiting_for_review',
    WaitingForApproval: 'waiting_for_approval',
    WaitingForFeedback: 'waiting_for_feedback',
    WaitingForResources: 'waiting_for_resources',
    WaitingForDependencies: 'waiting_for_dependencies',
  } as const, // Transforms intenal values into literal constants.

  Priority: {
    Undefined: 'undefined',
    Low: 'low',
    Medium: 'medium',
    High: 'high',
    Urgent: 'urgent',
    Critical: 'critical',
  } as const,

  ApprovalStatus: {
    Approved: 'approved',
    Pending: 'pending',
    Rejected: 'rejected',
  } as const,
};

// Export the types to control values.
export type EnumStatus = (typeof Enums.Status)[keyof typeof Enums.Status];
export type EnumPriority = (typeof Enums.Priority)[keyof typeof Enums.Priority];
export type EnumApprovalStatus =
  (typeof Enums.ApprovalStatus)[keyof typeof Enums.ApprovalStatus];

// Valid statuses for creation
type CreationStatusObject = Pick<
  typeof Enums.Status,
  | 'Pending'
  | 'InProgress'
  | 'OnHold'
  | 'WaitingForApproval'
  | 'WaitingForResources'
  | 'WaitingForDependencies'
>;
export type EnumCreationStatus =
  CreationStatusObject[keyof CreationStatusObject];

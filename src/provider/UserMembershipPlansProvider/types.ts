export type UserMembershipPlan = {
    id: number;
    user_id: string;
    expires_at: string;
    plan_id: number;
    status: string;
    provider_id: string;
    created_at: number;
    is_active: boolean;
    complete: boolean;
};

export type UserMembershipPlanResult = {
    statusText: string;
    data: UserMembershipPlan[];
};

export type CancelUserMembershipPlanResult = {
    status: number;
    success: boolean;
    result: UserMembershipPlan;
};


export type State = {
    userMembershipPlanList: UserMembershipPlan[];
    userMembershipPlanDict: { [key: string]: UserMembershipPlan }
    loadRequest: boolean;
    loadFailure: boolean;
    loadSuccess: boolean;
    loadHandles: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }>;
    loadError: Error | null;
    loaded: boolean;
};

export type Action =
    | { type: 'LOAD_REQUEST'; payload: { resolve: (value: any) => void; reject: (reason?: any) => void } }
    | { type: 'LOAD_FAILURE'; payload: { error: Error } }
    | { type: 'LOAD_SUCCESS'; payload: { userMembershipPlanList: UserMembershipPlan[] } }
    | { type: 'CANCEL_SUBSCRIPTION_SUCCESS'; payload: { userMembershipPlan: UserMembershipPlan } }
    | { type: 'REMOVE_SUBSCRIPTION_SUCCESS'; payload: { user_plan_id: number } };

export type ContextType = {
    loadRequest: boolean;
    loadFailure: boolean;
    loadSuccess: boolean;
    loadHandles: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }>;
    loadError: Error | null;
    userMembershipPlanList: UserMembershipPlan[];
    loadUserMembershipPlans: any;
    cancelUserMembershipPlan: any;
    userMembershipPlanDict: { [key: string]: UserMembershipPlan }
    loaded: boolean;
};
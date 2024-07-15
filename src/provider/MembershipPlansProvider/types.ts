export type MembershipPlan = {
    _id: string;
    type: string;
    billing_period: 'WEEK' | 'MONTH' | 'YEAR';
    _creationTime: string | number;
    price: number;
    token: number;
    storage: number;
    discount: number;
};

export type MembershipPlanResult = {
    success: boolean;
    result: MembershipPlan[];
};

export type State = {
    membershipPlanList: MembershipPlan[];
    membershipPlanDict: Record<string, MembershipPlan[]>;
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
    | { type: 'LOAD_SUCCESS'; payload: { membershipPlanList: MembershipPlan[] } };

export type ContextType = {
    loadRequest: boolean;
    loadFailure: boolean;
    loadSuccess: boolean;
    loadHandles: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }>;
    loadError: Error | null;
    membershipPlanList: MembershipPlan[];
    loadMembershipPlans: any;
    membershipPlanDict: Record<string, MembershipPlan[]>;
    loaded: boolean;
};
import React, { Key } from 'react';
interface TransitionGroupProps {
    component: any;
    childFactory: any;
}
interface TransitionGroupState {
    children: Record<Key, any>;
}
export default class TransitionGroup extends React.Component<TransitionGroupProps, TransitionGroupState> {
    static defaultProps: {
        component: string;
        childFactory: (child: any) => any;
    };
    private childRefs;
    private currentlyTransitioningKeys;
    private keysToEnter;
    private keysToLeave;
    constructor(props: any, context: any);
    componentDidMount(): void;
    static getDerivedStateFromProps(props: any, state: any): {
        children: {};
    };
    componentDidUpdate(_prevProps: any, prevState: any): void;
    performAppear: (key: any, component: any) => void;
    _handleDoneAppearing: (key: any, component: any) => void;
    performEnter: (key: any, component: any) => void;
    _handleDoneEntering: (key: any, component: any) => void;
    performLeave: (key: any, component: any) => void;
    _handleDoneLeaving: (key: any, component: any) => void;
    render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
export {};

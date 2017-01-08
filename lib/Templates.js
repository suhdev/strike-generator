"use strict";
const Actions = `import {StateKey as app} from './StateAndProps'; 

export enum {{cfg.name}}ActionTypes{

}

export const {{cfg.name}}Actions = {

}; 
`;
exports.Actions = Actions;
const Controller = `import * as React from 'react'; 
import {ControllerView} from 'strike-v2'; 
import {Reducer} from './Reducer'; 
import { {{cfg.name}}Props, {{cfg.name}}State, {{cfg.name}}InitialState, StateKey } from './StateAndProps'; 
import { {{cfg.name}}Actions } from './Actions'; 

export class {{cfg.name}}Ctrl extends ControllerView<{{cfg.name}}Props,{{cfg.name}}State>{
    constructor(props:{{cfg.name}}Props){
        super(props,StateKey,{{cfg.name}}InitialState,Reducer); 
    }

    render(){
        return (
            <div id="{{cfg.name}}Ctrl"></div>
        );
    }
}
`;
exports.Controller = Controller;
const Reducer = `import { {{cfg.name}}ActionTypes } from './Actions'; 
import {StateKey as app} from './StateAndProps'; 
import * as Immutable from 'immutable'; 
import {Action} from 'strike-v2'; 

export function Reducer(state:Immutable.Map<string,any>,action:Action):Immutable.Map<string,any>{
    let newState = state;
    switch(action.type){

    }
    return newState; 
}
`;
exports.Reducer = Reducer;
const StateAndProps = `import {ControllerViewProps} from 'strike-v2'; 

export const StateKey = "{{cfg.key}}"; 

export interface {{cfg.name}}Props extends ControllerViewProps {

}

export interface {{cfg.name}}State {

}

export const {{cfg.name}}InitialState:{{cfg.name}}State = {

};

`;
exports.StateAndProps = StateAndProps;
const Component = `import * as React from 'react'; 

export interface {{cfg.name}}Props {

}

export interface {{cfg.name}}State {

}

export class {{cfg.name}} extends React.Component<{{cfg.name}}Props,{{cfg.name}}State>{
    constructor(props:{{cfg.name}}Props){
        super(props); 
        this.state = {}; 
    }

    render(){
        return (
            <div className="{{cfg.name | lower | replace(' ','-')}}"></div>
        );
    }
}
`;
exports.Component = Component;
const Help = `
Here are the available commands:
strike --type controller --name CtrlName --dest destinationFolder 
strike --type component --name ComponentName --dest destinationFolder 
`;
exports.Help = Help;

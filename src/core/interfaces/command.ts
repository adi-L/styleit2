import * as CSS from 'csstype';
export default interface Command {
    nodeName: string;
    scheme: string;
    style?:CSS.Properties;
    attributes?:{[key:string]:string};
    classList?: string[];   
    splitDom?: string[];
}

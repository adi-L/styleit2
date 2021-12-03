import * as CSS from 'csstype';
export default interface Command {
    nodeName: string;
    scheme: string;
    style?:CSS.Properties;
    classList?: string[];   
    splitDom?: string[] ;
}

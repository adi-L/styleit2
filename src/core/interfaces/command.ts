import * as CSS from 'csstype';
export default interface Command {
    nodeName: String;
    scheme: string;
    style?:CSS.Properties;
    classList?: string[];   
    splitDom?: String[] ;
}

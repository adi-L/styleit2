import Plugin from './interfaces/Plugins';
import Command from './interfaces/Command';
import wrapSelection from './selection'
export default class Core {
  target:HTMLElement;
  plugins:Plugin;

  constructor(target:HTMLElement, plugins:Plugin) {
    this.target = target;
    this.plugins = plugins;
    this.init();

  }
  execCommand(command:Command){
    wrapSelection(this.target, command);
  }
  init() {
  }

  destroy() {

  }
}

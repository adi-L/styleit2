import Core from './core/index';
import Plugins from './core/interfaces/Plugins';
import Command from './core/interfaces/command';
import "./core/prototype"


export default class StyleIt {
  core: Core;
  constructor(target: HTMLElement, plugins: Plugins = {}) {
    this.core = new Core(target, plugins);
  }
  execCommand(command: Command) {
    this.core.execCommand(command);
  }
  destroy() {
    this.core.destroy();
  }
}
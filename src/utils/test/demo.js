/**
 * mitt函数用于创建一个事件总线
 * @param {Map} all - 存储事件类型和对应处理器的Map对象，默认为空
 * @returns {Object} - 包含all、on、off和emit方法的对象
 */
export function mitt(all) {
  all = all || new Map();
  return {
    all,
    /**
     * 添加处理器函数到指定事件类型
     * @param {string} type - 事件类型
     * @param {function} handler - 处理器函数
     */
    on(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler]);
      }
    },
    /**
     * 从指定事件类型中移除处理器函数
     * @param {string} type - 事件类型
     * @param {function} handler - 处理器函数
     */
    off(type, handler) {
      const handlers = all.get(type);
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        } else {
          all.set(type, []);
        }
      }
    },
    /**
     * 发送指定事件类型并触发所有处理器函数
     * @param {string}   - 事件类型
     * @param {object} evt - 事件对象
     */
    emit(type, evt) {
      let handlers = all.get(type);
      if (handlers) {
        handlers.slice().map((handler) => {
          handler(evt);
        });
      }
      handlers = all.get("*");
      if (handlers) {
        handlers.slice().map((handler) => {
          handler(type, evt);
        });
      }
    },
  };
}

//定义了一个事件类型的联合类型，可以是字符串或符号。
export type EventType = string | symbol;

// 定义了一个泛型函数类型，该函数接收一个参数 event（默认值为 unknown 类型），并返回 void。这个类型表示一个通用的事件处理器。
export type Handler<T = unknown> = (event: T) => void;

//定义了一个泛型函数类型，它接收两个参数：type（类型为对象 T 的键类型）和 event（类型为与 type 键对应的 T 对象中的属性值类型）。
//这个类型表示一个通配符事件处理器，它可以处理任何对象的任意属性。
export type WildcardHandler<T = Record<string, unknown>> = (
	type: keyof T,
	event: T[keyof T]
) => void;

// 定义了一个数组类型，其中元素都是 Handler<T> 类型，表示一组事件处理器。
export type EventHandlerList<T = unknown> = Array<Handler<T>>;

//它表示一个数组（Array），其中元素的类型是 WildcardHandler<T>。这里的 T 是一个默认为 Record<string, unknown> 的泛型参数。。
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<
	WildcardHandler<T>
>;

// 定义了一个映射类型（Map），其键可以是 Events 扩展接口（必须是具有 EventType 类型键的记录）的键，或者是通配符 '*'，
//而值则是 EventHandlerList 或 WildCardEventHandlerList 类型。
//这个类型用来存储不同事件类型及其对应的事件处理器集合，包括针对特定事件类型的处理器列表以及针对所有事件类型的通配符处理器列表。
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events | '*',
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;


/**
 *定义了一个事件发射器（Event Emitter），它可以处理不同类型和通配符的事件。
 Events 是一个泛型参数，
 它是一个扩展了 Record<EventType, unknown> 的接口或类型，
 意味着 Events 必须具有字符串或符号类型的键，并且其值可以是任意类型。
 */
export interface Emitter<Events extends Record<EventType, unknown>> {

  all: EventHandlerMap<Events>;

  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
  on(type: '*', handler: WildcardHandler<Events>): void;

  off<Key extends keyof Events>(
    type: Key,
    handler?: Handler<Events[Key]>
  ): void;
  off(type: '*', handler: WildcardHandler<Events>): void;

  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
  emit<Key extends keyof Events>(
    type: undefined extends Events[Key] ? Key : never
  ): void;
}


export default function mitt<Events extends Record<EventType, unknown>>(
	all?: EventHandlerMap<Events>
): Emitter<Events> {

	type GenericEventHandler = | Handler<Events[keyof Events]>| WildcardHandler<Events>;
	all = all || new Map();

	return {
		/**
		 * A Map of event names to registered handler functions.
		 */
		all,

		/**
		 * Register an event handler for the given type.
		 * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
		 * @param {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
			const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
			if (handlers) {
				handlers.push(handler);
			} else {
				all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
			}
		},

		/**
		 * Remove an event handler for the given type.
		 * If `handler` is omitted, all handlers of the given type are removed.
		 * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
		 * @param {Function} [handler] Handler function to remove
		 * @memberOf mitt
		 */
		off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
			const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
			if (handlers) {
				if (handler) {
					handlers.splice(handlers.indexOf(handler) >>> 0, 1);
				} else {
					all!.set(type, []);
				}
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `'*'` handlers are invoked after type-matched handlers.
		 *
		 * Note: Manually firing '*' handlers is not supported.
		 *
		 * @param {string|symbol} type The event type to invoke
		 * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
			let handlers = all!.get(type);
			if (handlers) {
				(handlers as EventHandlerList<Events[keyof Events]>)
					.slice()
					.map((handler) => {
						handler(evt!);
					});
			}

			handlers = all!.get('*');
			if (handlers) {
				(handlers as WildCardEventHandlerList<Events>)
					.slice()
					.map((handler) => {
						handler(type, evt!);
					});
			}
		}
	};
}

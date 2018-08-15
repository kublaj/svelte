/* src/Main.html generated by Svelte vx.y.z */
var Main = (function(answer) { "use strict";
	answer = (answer && answer.__esModule) ? answer["default"] : answer;

	function data() {
	return {
		answer: answer
	};
};

	function create_main_fragment(component, ctx) {
		var p, text, text_1;

		return {
			c() {
				p = createElement("p");
				text = createText("The answer is ");
				text_1 = createText(ctx.answer);
			},

			m(target, anchor) {
				insert(target, p, anchor);
				append(p, text);
				append(p, text_1);
			},

			p(changed, ctx) {
				if (changed.answer) {
					setData(text_1, ctx.answer);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(p);
				}
			}
		};
	}

	function Main(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._intro = true;

		this._fragment = create_main_fragment(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Main.prototype, {
	 	destroy: destroy,
	 	get: get,
	 	fire: fire,
	 	on: on,
	 	set: set,
	 	_set: _set,
	 	_updateFragment: _updateFragment,
	 	_mount: _mount,
	 	_differs: _differs
	 });

	Main.prototype._recompute = noop;

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._bind = options._bind;

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;
	}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function get() {
		return this._state;
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		this.root._lock = true;
		callAll(this.root._beforecreate);
		callAll(this.root._oncreate);
		callAll(this.root._aftercreate);
		this.root._lock = false;
	}

	function _set(newState, options) {
		var oldState = this._state,
			changed = this._changed || {},
			dirty = false;

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return false;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (!this._changed) {
			this._changed = changed;
			this._oldState = oldState;
		}

		if (!options || !options.skipUpdate) this._updateFragment();

		return true;
	}

	function _updateFragment() {
		if (!this._changed) return;
		var changed = this._changed,
			oldState = this._oldState;
		this._changed = this._oldState = null;

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function noop() {}

	function blankObject() {
		return Object.create(null);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}
	return Main;
}(theAnswer));
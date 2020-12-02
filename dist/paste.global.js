var paste = (function () {
  'use strict';

  function E () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
  }

  E.prototype = {
    on: function (name, callback, ctx) {
      var e = this.e || (this.e = {});

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
      });

      return this;
    },

    once: function (name, callback, ctx) {
      var self = this;
      function listener () {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },

    emit: function (name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;

      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }

      return this;
    },

    off: function (name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }

      // Remove event from queue to prevent memory leak
      // Suggested by https://github.com/lazd
      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

      (liveEvents.length)
        ? e[name] = liveEvents
        : delete e[name];

      return this;
    }
  };

  var tinyEmitter = E;
  var TinyEmitter = E;
  tinyEmitter.TinyEmitter = TinyEmitter;

  var PasteEventType = 'paste';
  var emitter = new TinyEmitter();
  /**
   * 监听用户的粘贴行为
   */
  function onPaste() {
      document.addEventListener('paste', function (e) {
          var _a;
          e.preventDefault();
          var items = (_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
          if (items) {
              handle(items);
          }
      });
      return {
          version: '1.0.0',
          on: function (fn) {
              emitter.on(PasteEventType, fn);
          }
      };
  }
  function handle(items) {
      // 最后一个对象
      var item = items[items.length - 1];
      // 对象的类别和类型
      var kind = item.kind, type = item.type;
      switch (kind) {
          case 'file':
              // 文件
              var file = item.getAsFile();
              if (file) {
                  emitter.emit(PasteEventType, {
                      kind: kind,
                      type: type,
                      data: file
                  });
              }
              break;
          case 'string':
              // 字符
              item.getAsString(function (str) {
                  emitter.emit(PasteEventType, {
                      kind: kind,
                      type: type,
                      data: str
                  });
              });
              break;
      }
  }

  return onPaste;

}());
//# sourceMappingURL=paste.global.js.map

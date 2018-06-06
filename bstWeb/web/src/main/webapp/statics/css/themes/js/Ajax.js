/**
 * @classDesc 异步请求工具类，不支持跨域访问
 * @exports Fw/Ajax
 */
Fw.Ajax = function (config) {
    Fw.apply(this, config);
    // call parent
    Fw.Ajax.superclass.constructor.call(this);
    return this;
};
Fw.extend(Fw.Ajax, Fw.util.Observable, {
    autoLoad: true,
    autoDecode: true,
    params: {},
    /**
     * 加载数据/页面
     * @param options
     */
    load: function (options) {
        var me = this;
        Fw.apply(me.params, options);
        me.lastOptions = options;
        if (me.fireEvent('beforeload', me) !== false) {
            me.isLoading = true;
            console.log("--ajax.url---", me.url);
            Fw.ajaxData(me.url, me.params, function (data) {
                me.fireEvent('load', me, data);
                me.isLoading = false;
            });
        }
    },
    /**
     * 重载
     */
    reload: function () {
        this.load(this.lastOptions);
    }
});


/**
 * AJAX:通讯封装
 */
;(function() {
    Fw.TransAjax = function() {
        return {
            _timeoutflg : false,// 是否超时信息的标记
            options : {
                timeout : 120000,// 超时时长
                showError : false,// 是否显示错误信息
                loadText : false
                // 只加载文本
            },
            init : function(conf) {
                Fw.apply(this.options, conf);
            },
            clear : function() {
                // 取消超时提醒时，需调用此方法。
                this._timeoutflg = false;
                if (this._timeoutHandle) {
                    clearTimeout(this._timeoutHandle);
                }
            },
            start : function() {
            },
            newXhr : function() {
                var xmlHttpObj = null;
                try {
                    xmlHttpObj = new XMLHttpRequest();
                } catch (e) {
                }
                return xmlHttpObj;
            },
            loadData : function(conf) {
                Fw.log.debug("---ajaxData-init----", "TransAjax");
                conf = Fw.apply({
                    loadText : false,
                    mediaType : "application/json"
                }, conf);
                this.post(conf);
            },
            post : function(conf) {
                var ajax = this;
                var opts = ajax.options;
                Fw.apply(opts, conf);
                ajax.start();
                var xhr = this.newXhr();
                xhr.onreadystatechange = function() {
                    var me = this;
                    if (me.readyState == 4) {
                        if (me.status == 200) {
                        	Fw.log.debug("---callback ", "TransAjax");
                            var rpdata = Fw.JsonEval(me.responseText);
                            if (rpdata) {
                                if (rpdata.STATUS == "005") {
                                    Fw.sessionTimeout();// session超时;
                                    return;
                                } else if (rpdata.STATUS == "006") {// 重复提交
                                    return;
                                } else if (rpdata.STATUS != "1") {
                                   if (opts.showError) {
                                        Fw.alertinfo("" + rpdata.MSG);
                                        return;
                                   }
                                }
                                opts.success && opts.success(rpdata);
                            } else {
                                if (opts.showError) {
                                    Fw.alertinfo(NS.MSG.MsgAjaxError);
                                }
                                opts.failure && opts.failure(rpdata);
                            }
                            ajax.clear();
                        }
                    }
                };
                xhr.open("POST", opts.url, true);
                xhr.setRequestHeader('Content-Type', opts.mediaType
                || 'application/json');
                xhr.send(Fw.JsonToStr(opts.param||opts.params||{}));
                // Timeout checker
                if (ajax.timeout > 0) {
                    ajax._timeoutHandle = setTimeout(function() {
                        if (xhr && ajax._timeoutflg) {
                            Fw.hideWaitPanel();
                            xhr.abort();
                            if (opts.showError) {
                                Fw.alertinfo(NS.MSG.MsgAjaxError);
                            }
                            //delete ajax;
                        }
                    }, ajax._timeoutflg);
                }
            }
        };
    };
})();
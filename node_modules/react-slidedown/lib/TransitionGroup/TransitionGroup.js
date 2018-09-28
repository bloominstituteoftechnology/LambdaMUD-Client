"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var chain_function_1 = tslib_1.__importDefault(require("chain-function"));
var ChildMapping_1 = require("./ChildMapping");
var TransitionGroup = (function (_super) {
    tslib_1.__extends(TransitionGroup, _super);
    function TransitionGroup(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.performAppear = function (key, component) {
            _this.currentlyTransitioningKeys[key] = true;
            if (component.componentWillAppear) {
                component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
            }
            else {
                _this._handleDoneAppearing(key, component);
            }
        };
        _this._handleDoneAppearing = function (key, component) {
            if (component && component.componentDidAppear) {
                component.componentDidAppear();
            }
            delete _this.currentlyTransitioningKeys[key];
            var currentChildMapping = ChildMapping_1.getChildMapping(_this.props.children);
            if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
                _this.performLeave(key, component);
            }
        };
        _this.performEnter = function (key, component) {
            _this.currentlyTransitioningKeys[key] = true;
            if (component.componentWillEnter) {
                component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
            }
            else {
                _this._handleDoneEntering(key, component);
            }
        };
        _this._handleDoneEntering = function (key, component) {
            if (component && component.componentDidEnter) {
                component.componentDidEnter();
            }
            delete _this.currentlyTransitioningKeys[key];
            var currentChildMapping = ChildMapping_1.getChildMapping(_this.props.children);
            if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
                _this.performLeave(key, component);
            }
        };
        _this.performLeave = function (key, component) {
            _this.currentlyTransitioningKeys[key] = true;
            if (component && component.componentWillLeave) {
                component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
            }
            else {
                _this._handleDoneLeaving(key, component);
            }
        };
        _this._handleDoneLeaving = function (key, component) {
            if (component && component.componentDidLeave) {
                component.componentDidLeave();
            }
            delete _this.currentlyTransitioningKeys[key];
            var currentChildMapping = ChildMapping_1.getChildMapping(_this.props.children);
            if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
                _this.keysToEnter.push(key);
            }
            else {
                _this.setState(function (state) {
                    var newChildren = tslib_1.__assign({}, state.children);
                    delete newChildren[key];
                    return { children: newChildren };
                });
            }
        };
        _this.childRefs = Object.create(null);
        _this.currentlyTransitioningKeys = {};
        _this.keysToEnter = [];
        _this.keysToLeave = [];
        _this.state = {
            children: ChildMapping_1.getChildMapping(props.children),
        };
        return _this;
    }
    TransitionGroup.prototype.componentDidMount = function () {
        var initialChildMapping = this.state.children;
        for (var key in initialChildMapping) {
            if (initialChildMapping[key]) {
                this.performAppear(key, this.childRefs[key]);
            }
        }
    };
    TransitionGroup.getDerivedStateFromProps = function (props, state) {
        var nextChildMapping = ChildMapping_1.getChildMapping(props.children);
        var prevChildMapping = state.children;
        return {
            children: ChildMapping_1.mergeChildMappings(prevChildMapping, nextChildMapping),
        };
    };
    TransitionGroup.prototype.componentDidUpdate = function (_prevProps, prevState) {
        var _this = this;
        var nextChildMapping = ChildMapping_1.getChildMapping(this.props.children);
        var prevChildMapping = prevState.children;
        for (var key in nextChildMapping) {
            var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
            if (nextChildMapping[key] && !hasPrev &&
                !this.currentlyTransitioningKeys[key]) {
                this.keysToEnter.push(key);
            }
        }
        for (var key in prevChildMapping) {
            var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
            if (prevChildMapping[key] && !hasNext &&
                !this.currentlyTransitioningKeys[key]) {
                this.keysToLeave.push(key);
            }
        }
        var keysToEnter = this.keysToEnter;
        this.keysToEnter = [];
        keysToEnter.forEach(function (key) { return _this.performEnter(key, _this.childRefs[key]); });
        var keysToLeave = this.keysToLeave;
        this.keysToLeave = [];
        keysToLeave.forEach(function (key) { return _this.performLeave(key, _this.childRefs[key]); });
    };
    TransitionGroup.prototype.render = function () {
        var _this = this;
        var childrenToRender = [];
        var _loop_1 = function (key) {
            var child = this_1.state.children[key];
            if (child) {
                var isCallbackRef = typeof child.ref !== 'string';
                var factoryChild = this_1.props.childFactory(child);
                var ref = function (r) {
                    _this.childRefs[key] = r;
                };
                if (!isCallbackRef) {
                    throw new Error('string refs are not supported on children of TransitionGroup. ' +
                        'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute');
                }
                if (factoryChild === child && isCallbackRef) {
                    ref = chain_function_1.default(child.ref, ref);
                }
                childrenToRender.push(react_1.default.cloneElement(factoryChild, {
                    key: key,
                    ref: ref,
                }));
            }
        };
        var this_1 = this;
        for (var key in this.state.children) {
            _loop_1(key);
        }
        var props = tslib_1.__assign({}, this.props);
        delete props.childFactory;
        delete props.component;
        return react_1.default.createElement(this.props.component, props, childrenToRender);
    };
    TransitionGroup.defaultProps = {
        component: 'span',
        childFactory: function (child) { return child; },
    };
    return TransitionGroup;
}(react_1.default.Component));
exports.default = TransitionGroup;
//# sourceMappingURL=TransitionGroup.js.map
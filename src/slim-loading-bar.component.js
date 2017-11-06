// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-slim-loading-bar
import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { SlimLoadingBarService, SlimLoadingBarEventType } from './slim-loading-bar.service';
import { isPresent } from './slim-loading-bar.utils';
/**
 * A Slim Loading Bar component shows message loading progress bar on the top of web page or parent component.
 */
export var SlimLoadingBarComponent = (function () {
    function SlimLoadingBarComponent(service, _elmRef, _changeDetectorRef) {
        this.service = service;
        this._elmRef = _elmRef;
        this._changeDetectorRef = _changeDetectorRef;
        this.isTransition = 'none';
        this._progress = '0';
        this.color = 'firebrick';
        this.height = '2px';
        this.show = true;
    }
    Object.defineProperty(SlimLoadingBarComponent.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (progress) {
            this.isTransition = progress >= this._progress ? 'all 0.5s ease-in-out' : 'none';
            this._progress = progress;
        },
        enumerable: true,
        configurable: true
    });
    SlimLoadingBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.events.subscribe(function (event) {
            if (event.type === SlimLoadingBarEventType.PROGRESS && isPresent(event.value)) {
                _this.progress = event.value;
            }
            else if (event.type === SlimLoadingBarEventType.COLOR) {
                _this.color = event.value;
            }
            else if (event.type === SlimLoadingBarEventType.HEIGHT) {
                _this.height = event.value;
            }
            else if (event.type === SlimLoadingBarEventType.VISIBLE) {
                _this.show = event.value;
            }
        });
    };
    SlimLoadingBarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.service.events.subscribe(function (event) {
            _this._elmRef.nativeElement.visible = event.type === SlimLoadingBarEventType.VISIBLE ? event.value : true;
            _this._changeDetectorRef.detectChanges();
        });
    };
    SlimLoadingBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng2-slim-loading-bar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "<div [style.display]=\"show ? 'block' : 'none'\"  id=\"gray_bg\"><div class=\"slim-loading-bar\">\n                     <div class=\"slim-loading-bar-progress\" [style.width]=\"progress + '%'\" [style.backgroundColor]=\"color\" [style.color]=\"color\"  [style.height]=\"height\" [style.display]=\"show ? 'block' : 'none'\"></div>\n                    <img style=\"position:fixed;left:10px;bottom:30px;\" src=\"/assets/images/loading.gif\" /></div></div>"
                },] },
    ];
    /** @nocollapse */
    SlimLoadingBarComponent.ctorParameters = function () { return [
        { type: SlimLoadingBarService, },
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
    ]; };
    SlimLoadingBarComponent.propDecorators = {
        'progress': [{ type: Input },],
        'color': [{ type: Input },],
        'height': [{ type: Input },],
        'show': [{ type: Input },],
    };
    return SlimLoadingBarComponent;
}());

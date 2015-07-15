//
// Copyright (C) 2012 Alex Michael
//
// ### Licence

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// ### Documentation

// #### F

// The F object is created and returned by the <figure class="highlight"><table><tr><td class="gutter"><pre><span class="line">1</span><br></pre></td><td class="code"><pre><span class="line">// constructor. Users can save a reference to this object to&#10;// manually update the state of the image later on.&#10;// It provides a simple API which allows one to save the image,&#10;// provide callbacks to be called when the image is ready and&#10;// update the image with new effects manually, instead of one-off&#10;// in the constructor callback.&#10;var F = function(el, callback, timestamp)&#10;&#123;&#10;    var name   = el[0].nodeName.toLowerCase(),&#10;        offset = el.position(),&#10;        events = null,&#10;        _ready = false,&#10;        _callback = callback || null;&#10;&#10;    // Replaces an image with a canvas element.&#10;    var repl = function(pic)&#10;    &#123;&#10;        var img = new Image();&#10;&#10;        img.src = el.attr(&#34;src&#34;);&#10;        img.onload = $.proxy(function()&#10;        &#123;&#10;            var c = $(&#34;&#60;canvas&#62;&#34;, &#123;&#10;                        &#39;id&#39;   : &#34;filtrr2-&#34; + el.attr(&#39;id&#39;),&#10;                        &#39;class&#39;: el.attr(&#39;class&#39;),&#10;                        &#39;style&#39;: el.attr(&#39;style&#39;)&#10;                    &#125;)&#10;                    .css(&#123;&#10;                        width: el.width(),&#10;                        height: el.height(),&#10;                        top : offset.top,&#10;                        left: offset.left&#10;                    &#125;),&#10;                canv = c[0], ctx;&#10;&#10;            this.canvas  = c;&#10;&#10;            canv.width  = img.width;&#10;            canv.height = img.height;&#10;&#10;            canv.getContext(&#34;2d&#34;).drawImage(img, 0, 0);&#10;&#10;            // Replace with canvas.&#10;            el.hide();&#10;            el.parent().append(c);&#10;&#10;            // All done - call callback with a new&#10;            // ImageProcessor object as context.&#10;            this.processor = new Filtrr2.ImageProcessor(this);&#10;            if (_callback) &#123;&#10;                _callback.call(this.processor, this);&#10;            &#125;&#10;            _ready = true;&#10;&#10;&#9;    console.log(&#34;repl called. canvas=&#34; + this.canvas);&#10;        &#125;, this);&#10;    &#125;;&#10;&#10;    // Original element, usually a picture.&#10;    this.el = el;&#10;&#10;    // When was this created? Mainly for testing purposes.&#10;    this.created = timestamp;&#10;&#10;    // Reference to the image processor.&#10;    this.processor = null;&#10;&#10;    // Reference to the canvas element.&#10;    this.canvas = null;&#10;&#10;    // Setup proxies for the event methods. The ```on()</span><br></pre></td></tr></table></figure>

    // method is replaced with a proxy method which sets
    // the context of all events to ```this```.
    events = new Filtrr2.Events();
    this.on = $.proxy(function(ev, callback) {
        events.on(ev, callback, this);
    }, this);
    this.off = events.off;
    this.trigger = events.trigger;

    // Register a callback to be called when ```Filtrr2``` is ready. If
    // it's already ready by the time of this call, the callback
    // will immediately fire. If a callback was passed through
    // the ```Filtrr2``` constructor, then any callback passed through
    // this method will override that.
    this.ready = function(callback)
    {
        if (!callback) {
            return _ready;
        }
        _callback = callback;
        if (_ready) {
	    concole.log("ready callback.");
            _callback.call(this.ip, this);
        }
    };

    // Update ```Filtrr2``` through a callback. The callback
    // is given the ImageProcessor as context. Used to
    // dynamically update the image with new filters.
    // This method will only execute if ```Filtrr2``` is ready,
    // otherwise the callback is ignored.
    this.update = function(callback)
    {
        if (callback) {
            if (_ready) {
                callback.call(this.processor);
            }
        };
    };

    // 'Forces' a download of the current image. If the
    // canvas is not ready this is a noop.
    this.save = function(type)
    {
        var data, type = type || "png", mimetype = "image/" + type;
        if (_ready) {
            data = this.canvas[0].toDataURL(mimetype);
            if (data.indexOf(mimetype) == -1) {
                mimetype = "image/png";
            }
            // Force octet-stream.
            data = data.replace(mimetype, "image/octet-stream")
            window.location.href = data
        }
    };

    // Resets the internal buffer of the object. This doesn't
    // reset the actual canvas. Therefore, you need to call
    // render() for the reset to take place.
    this.reset = function()
    {
        if (_ready) return this.processor.reset();
    };

    // If this is an image we need to replace it with
    // a canvas element.
    if (name == "img") {

        repl.call(this, el);

    // If this is a canvas element then create the processor
    // immediately.
    } else if (name == "canvas") {

        this.canvas = el;
        this.processor = new Filtrr2.ImageProcessor(this);
        if (_callback) {
            _callback.call(this.processor);
        }
        _ready = true;

    // Only images and canvas elements are supported.
    } else {
        throw new Error("'" + name + "' is an invalid object.");
    }

    console.log("F called. el=" + this.el);
    return this;
};

// #### Filtrr2

// The constructor almighty. Performs checks for canvas support
// and gets the element if it's a selector. Also maintains an
// internal cache of F instances keyd on selector. The timestamp
// on the cache entries serves no particular purpose - it's mainly
// for testing.
// The constructor can take an array of options. The only one supported
// so far is 'store' which if false, will not cache this
var Filtrr2 = (function()
{
    var store = {};

    // Check for canvas compatibility.
    if ($("<canvas>")[0].getContext("2d") == null) {
        throw new Error("Canvas is not supported in this browser.");
    }

    return function(_el, callback, options) {

        var t, el, isSelector, timestamp, key, inst;

        if (options == null) options = {store: true};

        if (typeof _el === 'undefined' || _el === null) {
            throw new Error("The element you gave Filtrr2 was not defined.");
        }

        t  = typeof _el;
        el = _el;

        // Is this a string i.e a jQuery selector?
        isSelector = (t === 'string'
            || t === 'object' && _el.constructor.toString().indexOf("String") > -1);

        if (isSelector) {
            key = _el;
        } else {
            key = _el.selector;
        }

        // If cached return cached F instance.
        if (store[key]) {
            return store[key].F;
        } else {
            if (isSelector) {
                el = $(_el);
            }

            // Bad selector!
            if (el.length === 0) {
                throw new Error("Element not found.");
            }

            timestamp = new Date().getTime();
            inst = new F(el, callback, timestamp);
            if (options.store) {
                store[key] = {
                    timestamp: timestamp,
                    F: inst
                };
            }
	    console.log("init. inst=" + inst + "," + inst.el);
            return inst;
        }
    };

}());
</canvas>
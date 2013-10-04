(function(window, $, undefined) {

    $(document).ready(function() {
        $("[data-youtube]").each(function() {
            var $this = $(this), youtubeId = $this.attr("data-youtube");

            $this.click(function(e) {
                var $container = createContainer($this),
                    $iframe = createYoutubeIframe(youtubeId);

                e.preventDefault();
                
                $this.unbind("click");

                $container.append($iframe);
                $this.replaceWith($container);

                fixFirefoxDisplay($container);
                fixIE7Display($container);
            });
        });
    });

    var createContainer = function($target) {
        var cssPropertiesToCopy = [
                "position",
                "display",
                "top",
                "left",
                "bottom",
                "right",
                "width",
                "height",
                "padding",
                "margin",
                "float",
                "z-index",
                "border-width"
            ],
            $container = $("<div></div>");

        for (var i = 0; i < cssPropertiesToCopy.length; i++) {
            $container.css(cssPropertiesToCopy[i], $target.css(cssPropertiesToCopy[i]));
        }
        $container.css({
            "border-style": "solid",
            "border-color": "transparent"
        });

        swapCssPropertyValue($container, "position", "static", "relative");
        swapCssPropertyValue($container, "display", "inline", "inline-block");

        return $container;
    };

    var fixFirefoxDisplay = function($container) {
        swapCssPropertyValue($container, "display", "inline", "inline-block");
    };

    var addIE7DisplayInlineFixCssClass = (function() {
        var added = false;
        return function() {
            if (added) { return; }
            added = true;
            addStyle(".jquery-youtube-ie7-display-inline-fix { display: inline-block; *zoom: 1; *display: inline; }");
        }
    }());

    var fixIE7Display = function($container) {
        addIE7DisplayInlineFixCssClass();
        if ($("html").hasClass("ie7") && $container.css("display") === "inline-block") {
            $container.css("display", "");
            $container.addClass("jquery-youtube-ie7-display-inline-fix");
        }
    }

    var swapCssPropertyValue = function($el, propName, undesiredValue, replaceWith) {
        if ($el.css(propName) === undesiredValue) {
            $el.css(propName, replaceWith);
        }
    }

    var createYoutubeIframe = function(youtubeId) {
        var $iframe = $('<iframe frameborder="0" allowfullscreen></iframe>').attr("src", "http://www.youtube.com/embed/" + youtubeId + "?autoplay=1");
        $iframe.css({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%"
        });

        return $iframe;
    };

    var addStyle = function(cssText) {
        var el = window.document.createElement("style");
        el.type = "text/css";
        el.media = "screen";
        if (el.styleSheet) {
            el.styleSheet.cssText = cssText;
        }
        else {
            el.appendChild(document.createTextNode(cssText));
        }
        $("head").append(el);
    };

}(window, jQuery));
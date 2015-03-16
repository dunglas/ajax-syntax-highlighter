# Ajax Syntax Highlighter #

_Ajax Syntax Highlighter_ is a small Javascript utility designed to highlight code embed in a web page in a standard compliant way.
It automatically looks for source code in the page, send it to a server-side highlighter and display the highlighted code. It also has a "view as plain text" feature and support internationalization.

_Ajax Syntax Highlighter_ is built with [Yahoo! UI](http://developer.yahoo.com/yui/) and uses [JSON](http://www.json.org/) for serialization. It is wrote by [Kévin Dunglas](http://lapin-blanc.net).
It currently includes [GeSHi](http://qbnz.com/highlighter/) as server-side (PHP required) highlighter but it can be easily used with others such as [Pygments](http://pygments.org/).

**[See a demo.](http://lapin-blanc.net/wp-content/plugins/ajax-syntax-highlighter/test.html)**

## Install ##

Unzip the archive or get _Ajax Syntax Highlighter_ via Subversion. Put the resulting directory into your Apache document root with PHP enabled (for GeSHi).

Try to load `http://<your-host>/<your-directory>/ajax-syntax-highlighter/test.html` to check if your installation is correct.

In your HTML file add the following lines in the `HEAD` section to active _Ajax Syntax Highlighter_:
```
<link rel="stylesheet" type="text/css" href="http://<your-host>/<your-directory>/ajax-syntax-highlighter/ajax-syntax-highlighter.css" />

<script type="text/javascript" src="http://yui.yahooapis.com/combo?2.5.2/build/yahoo-dom-event/yahoo-dom-event.js&amp;2.5.2/build/connection/connection-min.js&amp;2.5.2/build/json/json-min.js&amp;2.5.2/build/selector/selector-beta-min.js"></script>
<script type="text/javascript" src="http://<your-host>/<your-directory>/ajax-syntax-highlighter/ajax-syntax-highlighter.js"></script>
```

Is is also recommended to use the Yahoo! UI base, fonts and reset CSS files. Put before the previous lines:
```
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.5.2/build/reset-fonts/reset-fonts.css" /> 
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.5.2/build/base/base-min.css" />
```

Now add your snippets to your page like this:
```
<pre><code class="language-php">&lt;?php
echo 'Hello, World';
?&gt;</code></pre>
```

You must use the `code` tag with a `class` attribute following the HTML5 `language-<language-name>` convention. You can add a `pre` tag if needed.

If you want to active an interface translation (here in French) edit `ajax-syntax-highlighter.js` and replace `this.lang = "en"` by `this.lang = "fr"` in the `HighlighterConfig` function.

That's all folk !
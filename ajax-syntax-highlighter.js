/**
 * HighlighterConfig class
 * Handle the global configuration of the script.
 * Change your settings here.
 */
function HighlighterConfig () {
  this.lang        = "en";
  this.tutorialUrl = "http://www.google.com/search?q=%s+tutorial&btnI=I'm Feeling Lucky";
  this.aboutUrl    = "http://lapin-blanc.net/";
}

var config = new HighlighterConfig();

/**
 * i18n
 */
var i18n = {
  "fr": {
    "full text": "texte",
    "colored": "coloré",
    "about": "à propos"
  }
}

function _(s) {
  if (typeof(i18n) != "undefined" && i18n[config.lang] && i18n[config.lang][s])
    return i18n[config.lang][s];
  return s;
}

/**
 * Snippet class
 * Represents one snippet of code.
 */
function Snippet(data, elem, colored_html) {
  this.data = data;
  this.elem = elem;
  this.colored_html = colored_html;
  
  this.highlight();
}

/**
 * Highlight a snippet of code.
 */
Snippet.prototype.highlight = function() {
  if (this.elem.parentNode.tagName == "PRE") {
      this.text_html       = this.elem.parentNode;
      parent               = this.text_html.parentNode;
    } else {
      this.text_html       = this.elem;
      parent               = this.elem.parentNode;
    }
    
    /* Create the container */
    this.snippet           = document.createElement("div");
    this.snippet.className = "ajax-syntax-highlighter";
    
    /* Create the menu bar */
    var bar                = document.createElement("ul");
    bar.className          = "bar";
    
    /* Display the language */
    var language           = document.createElement("li");
    language.className     = "language";
    
    var link               = document.createElement("a");
    link.setAttribute("href", config.tutorialUrl.replace("%s", this.data.language));
    
    var txt                = document.createTextNode(this.data.language);
    link.appendChild(txt);
    language.appendChild(link);
    bar.appendChild(language);

    /* Display the switch mode button */
    this.mode               = document.createElement("li");
    this.mode.className         = "tools";
    var txt                = document.createTextNode(_("full text"));
    this.mode.appendChild(txt);
    bar.appendChild(this.mode);
      
    var about              = document.createElement("li");
    about.className        = "tools";
      
    var link               = document.createElement("a");
    link.setAttribute("href", config.aboutUrl);
    
    /* Display the about link */
    var txt                = document.createTextNode(_("about"));
    link.appendChild(txt);
    about.appendChild(link);
    bar.appendChild(about);

    this.snippet.appendChild(bar);

    /* Create the colored version */
    this.code              = document.createElement("div");
    this.code.innerHTML    = this.colored_html;
    this.snippet.appendChild(this.code);
    
    /* Hide the semantic version and display the colored */
    parent.removeChild(this.text_html);
    parent.appendChild(this.snippet);
    
    /* Create and hide the textarea */
    this.textarea_html              = document.createElement("textarea");
    this.textarea_html.value        = this.elem.firstChild.nodeValue;
    
    //YAHOO.util.Dom.setStyle(this.textarea_html, "width", YAHOO.util.Dom.getStyle(this.code, "width"));
    YAHOO.util.Dom.setStyle(this.textarea_html, "height", YAHOO.util.Dom.getStyle(this.code, "height"));
    //var resize = new YAHOO.util.Resize(this.textarea_html);
    this.textarea_html.style.display = "none";
  
    this.snippet.appendChild(this.textarea_html);

    
    this.colored            = true;
      
    YAHOO.util.Event.addListener(this.mode, "click", this.changeMode, this);
}

/**
 * Change the selected mode when clicking on the button.
 */
Snippet.prototype.changeMode = function(e, me) {
  if (me.colored) {
    me.code.style.display = "none";
    me.textarea_html.style.display = "block";
    
    /* Change the button's text */
    me.mode.firstChild.nodeValue = _("colored");
    
    /* Select the text */
    me.textarea_html.focus();
    me.textarea_html.select();

   
     me.colored = false;
  } else {
    me.textarea_html.style.display = "none";
    me.code.style.display = "block";
    
    /* Change the button's text */
    me.mode.firstChild.nodeValue = _("full text");
   
    me.colored = true;
  }
}


/**
 * Highlighter class
 * Select all the codes blocks and creates the snippets.
 */
function Highlighter() {
  var snippets = new Array();
  var nodes = YAHOO.util.Selector.query('code[class^=language-]');
  for (var i = 0; i < nodes.length; i++) {
    //var language = nodes[i].className.substring(9);
    //var source = nodes[i].firstChild.nodeValue;
    snippets.push({"language": nodes[i].className.substring(9), "source": nodes[i].firstChild.nodeValue});
    //highlight(source, language, nodes[i]);
  }
  this.highlight(snippets, nodes, this);
}

Highlighter.prototype.highlight = function(snippets, nodes, me)
{
  var code;
  var reponseSuccess = function(o) {
    var to_delete;
    var parent;
    var highlighted      = YAHOO.lang.JSON.parse(o.responseText);

    for (var i = 0; i < nodes.length; i++) {
      new Snippet(snippets[i], nodes[i], highlighted[i]);      
    }
  }

  var callback = {
    success: reponseSuccess
  };


  postData = "snippets=" + encodeURIComponent(YAHOO.lang.JSON.stringify(snippets));
  var transaction = YAHOO.util.Connect.asyncRequest("POST", "highlighter.php", callback, postData);
}

function run_highlighter() {
  highlighter = new Highlighter();
}

YAHOO.util.Event.onDOMReady(run_highlighter);

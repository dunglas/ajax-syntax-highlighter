<?php
include_once('lib/geshi/geshi.php');

// Strip slashes if magic quote is enabled
// Adapted from http://talks.php.net/show/php-best-practices/26
if (get_magic_quotes_gpc()) {
  function strip_quotes(&$var)
  {
    if (is_array($var)) {
      array_walk($var, 'strip_quotes');
    } else {
      $var = stripslashes($var);
    }
  }

  foreach (array('GET', 'POST', 'REQUEST') as $v) {
    if (!empty(${"_".$v})) {
      array_walk(${"_".$v}, 'strip_quotes');
    }
  }
}

$snippets = json_decode($_REQUEST['snippets'], true);


foreach ($snippets as $snippet) {
  $geshi =& new Geshi($snippet['source'], $snippet['language']);
  $geshi->enable_line_numbers(GESHI_FANCY_LINE_NUMBERS, 2);
  
  $highlighted[] = $geshi->parse_code();
}

echo json_encode($highlighted);
?>

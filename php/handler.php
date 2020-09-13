<?php
session_start();
date_default_timezone_set("Europe/Moscow");
$current_time = date("H:m:s");
$start = microtime(true);

$x = ($_GET['check_box_group']);
$y = ($_GET['y']);
$r = ($_GET['radio_group']);
$ans = "";
if ($x > 0 && $y > 0) {
    $ans = "NO";
} else if ($x <= 0 && $y >= 0) {
    //echo ('2');
    if ($x * $x + $y * $y <= $r * $r)
        $ans = "YES";
    else
        $ans = "NO";
} else if ($x < 0 && $y < 0) {
    if (($y - 0.00001 >= (-1 * ($r / 2)) && ($x - 0.00001 >= -1 * $r)))
        $ans = "YES";
    else
        $ans = "NO";
} else {
    //echo ('4');
    if ((2 * $x * $r - $y * $r - $r ** 2) <= 0) {
        $ans = "YES";
    } else {
        $ans = "NO";
    }
}

$time = microtime(true) - $start;
$res_table = array((int) $x, (float) $y, (float) $r, $current_time, $time, $ans);

if (!isset($_SESSION['history'])) {
    $_SESSION['history'] = array();
}

array_push($_SESSION['history'], $res_table);
include "table.php";

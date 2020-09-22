<?php
session_start();
date_default_timezone_set("Europe/Moscow");
$current_time = date("H:m:s");
$start = microtime(true);
$box = array(-4, -3, -2, -1, 0, 1, 2, 3, 4);
$rad = array(1, 1.5, 2, 2.5, 3);
$x = ($_GET['check_box_group']);
$y = "2.23232";//($_GET['y']);
$r = ($_GET['radio_group']);
$ans = "";
$chek = 0;

function checkY($y) {
    if (strrpos($y, '.') != -1) {
        $idx = strrpos($y, '.');
        $ceil = substr($y, 0, $idx);
        $post = substr($y, $idx + 1);
        if (abs($ceil) <= 3) {
            return true;
        } else if (preg_match('/[1-9]/', $post)) {
            return false;
        }

    } else {
        return abs($y) <= 3;
    }
}

function valid($x, $y, $r, $start, $current_time, $box, $rad) {


    if (is_numeric($x) && is_numeric($y) && is_numeric($r) && checkY($y)&& (abs($y) <= 3) && array_search($x, $box) && array_search($r, $rad)) {
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
        $res_table = array((int) $x, (float)$y, (float) $r, $current_time, $time, $ans);

        if (!isset($_SESSION['history'])) {
            $_SESSION['history'] = array();
        }
        array_push($_SESSION['history'], $res_table);


    }
    //array_push($_SESSION['history'], $res_table);
}
valid($x, $y, $r, $start, $current_time, $box, $rad);
include "table.php";






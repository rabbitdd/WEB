<table class="result_table">
                <tr>
                    <th class="header" width = "16.7%" > X</th >
                    <th class="header" width = "16.7%" > Y</th >
                    <th class="header" width = "16.7%" > R</th >
                    <th class="header" width = "16.7%" > TIME</th >
                    <th class="header" width = "16.7%" > SCRIPT TIME </th >
                    <th class="header" width = "16.7%" > RESULT</th >
                </tr >
                <?php foreach ($_SESSION['history'] as $val) { ?>
                <tr align = "center" style = "color: ghostwhite;" >
                    <td width = "16.7" > <?php echo $val[0]?></td >
                    <td width = "16.7" > <?php echo $val[1]?></td >
                    <td width = "16.7" > <?php echo $val[2]?></td >
                    <td width = "16.7" > <?php echo $val[3]?></td >
                    <td width = "16.7" > <?php echo number_format($val[4], 10, ".", "") * 1000000?></td >
                    <?php
                    if ($val[5] == "YES") {
                        ?>
                        <td width="16.7" class="yes"><?php echo $val[5]?></td>
                        <?php
                    } else {
                        ?>
                        <td width="16.7" class="no"><?php echo $val[5]?></td>
                        <?php
                    }
                    ?>
                </tr >
                <?php }?>
            </table>
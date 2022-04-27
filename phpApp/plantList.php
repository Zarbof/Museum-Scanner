<?php
header('Access-Control-Allow-Origin: *');
    session_start();

    if($_SESSION['userType'] != "Admin"){
        header("Location: museumLogin.php");
    }

?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href='//fonts.googleapis.com/css?family=Forum|Open+Sans:600,regular,italic,700&amp;subset=latin' rel='stylesheet' type='text/css'>
    <meta charset="UTF-8" />
    <title>Plant List</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <div class="page">
        <header class="menu-container">
                <h1 class="logo">
                    <img src="./media/salmon.png" width=auto height=100 >
                    <a class="logo-link" href="./artifactList.php">Lelooska Museum</a>
                </h1>
                <nav class="menu">
                    <li><a class="nav-link" href="./artifactList.php">Artifacts</a></li>
                    <li><a class="nav-link" href="./plantList.php">Plants</a></li>
                    <li><a class="nav-link" href="./accessCode.php">Access Code</a></li>
                    <li><a class="nav-link" href="./account.php">Account Info</a></li>
                    <li><a class="nav-link" href="./signOut.php">Sign Out</a></li>
                </nav>
            </header>
        <article class="content">

        <!--Title-->
            <header>
                <h2>Plant List</h2>
            </header>

            <?php
                if(isset($_SESSION['error'])){
                    $error = $_SESSION['error'];
                    echo "<br><span><b>$error</b></span><br>";
                }

                if(isset($_SESSION['success'])){
                    $success = $_SESSION['success'];
                    echo "<br><span><b>$success</b></span>";
                }
            ?>

            <div class="showStoreContainer">
                <div class="showStoreSubmenu">

                    <!-- Show All Artifacts -->
                    <br>    
                    <div>
                        <a href="plantList.php" class="strong-button small">Show all plants</a>
                        <a href="addPlant.php" class="strong-button small">Add new plant</a>
                    </div>

                    <!-- Search Bar -->
                    <br>
                    <div>
                        <form action="plantList.php" method="get">
                            <label for="s">Search for plant(s):</label>
                            <input type="search" name="s" required>
                            <input type="submit" class="strong-button small" value=" Submit " />
                        </form>
                    </div>
            
                <!-- Plant Table -->
                <div class="tableContainer">
                    <?php

                        //path to the SQLite database file
                        $db_file = './museum.db';

                        try {
                            //open connection to the museum database file
                            $db = new PDO('sqlite:' . $db_file);

                            //set errormode to use exceptions
                            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                            if (isset($_GET['s'])) { // if searching for plant(s)
                                $searchTerm = $_GET['s'];
                                $stmt = $db->prepare("select * from Entry where entryType = 'plant' and entryName like ? order by entryName");
                                $stmt->execute(["%".$_GET["s"]."%"]);
                                $t = $stmt->fetchAll(PDO::FETCH_ASSOC);

                                // if no plant similar to search query
                                if (empty($t)){
                                    echo("<br>No plant(s) found.");
                                }
                                else{
                                    echo '<br>
                                    <table>
                                        <thead>
                                            <tr>
                                            <th>Plant Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>';
                                    foreach($t as $tuple){
                                        echo '<tr>
                                                <td>'.$tuple['entryName'].'</td>
                                                <form action="editPlant.php?ID='.$tuple['entryID'].'" method="post">
                                                <td><input type="submit" value=" Edit Plant "></td>
                                                </form>
                                                <form action="remove.php?ID='.$tuple['entryID'].'&type=plant" method="post">
                                                <td><input type="submit" value=" Remove Plant "></td>
                                                </form>
                                            </tr>';
                                    }
                                    echo '</tbody>
                                    </table>';

                                }
                            }

                            else if (!isset($_GET['s'])){
                                //retrieve all artifacts
                                $qry = "select * from Entry where entryType = 'plant' order by entryName;";
                                $result_set = $db->query($qry);

                                //print the table
                                echo '<br>
                                    <table>
                                        <thead>
                                            <tr>
                                            <th>Plant Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>';
                                foreach($result_set as $tuple){
                                    echo '<tr>
                                            <td>'.$tuple['entryName'].'</td>
                                            <form action="editPlant.php?ID='.$tuple['entryID'].'" method="post">
                                            <td><input type="submit" value=" Edit Plant "></td>
                                            </form>
                                            <form action="remove.php?ID='.$tuple['entryID'].'&type=plant" method="post">
                                            <td><input type="submit" value=" Remove Plant "></td>
                                            </form>
                                        </tr>';
                                }
                                echo '</tbody>
                                    </table>';
                            }
                            //disconnect from db
                            $db = null;
                        }
                        catch(PDOException $e) {
                            die('Exception : '.$e->getMessage());
                        }
                    ?>

                </div>
            </div>
        </article>
    </div>
</body>
</html>

<?php
    unset($_SESSION['success']);
    unset($_SESSION['error']);
?>
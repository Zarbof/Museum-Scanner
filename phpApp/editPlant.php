<?php
	session_start();

	if($_SESSION['userType'] != "Admin"){
        header("Location: museumLogin.php");
    }

?>

<!DOCTYPE html>
<html>

<?php

// get plant ID from URL
$plantID = $_GET['ID'];
$iderror = "Invalid plant ID (please select a plant from the list below).";

// path to the SQLite database file
$db_file = './museum.db';

try {
    // open connection to the museum database file
    $db = new PDO('sqlite:' . $db_file);

    // set errormode to use exceptions
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare to fetch info of plant with this id
	$stmt = $db->prepare("select * from Entry where entryID = ?");

	// fetch info of plant with this id
	$stmt->execute([$plantID]);
	$tuple = $stmt->fetch(PDO::FETCH_ASSOC);

	// if id was invalid (if no plant with this id)
	if (empty($tuple)){
		$_SESSION['error'] = $iderror;
		$db = null;
		header("Location: plantList.php");
	}

	// if id was valid, define variables
	$entryName = $tuple['entryName'];
	$entryDescription = $tuple['entryDescription'];

	// disconnect from db
    $db = null;
}
catch(PDOException $e){
	die('Exception : '.$e->getMessage());
}

?>
	<head>
		<link rel="icon" href="http://lelooska.org/wp-content/uploads/2013/01/salmon_transparent.png">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<link href='//fonts.googleapis.com/css?family=Forum|Open+Sans:600,regular,italic,700&amp;subset=latin' rel='stylesheet' type='text/css'>
		<meta charset="UTF-8" />
		<title>Edit Plant Info</title>
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

			<!--Title and Form-->
			<article class="content">
				<header class="title">
					<?php
		                if(isset($_SESSION['addSuccess'])){
		                    $success = $_SESSION['addSuccess'];
		                    echo "<br><span><b>$success</b></span><br>";
		                    unset($_SESSION['addSuccess']);
		                }
		            ?>
		            <br>
					<h2>Plant Info</h2>
				</header>

				<!-- Form -->
				<form
					class="museumForm"
					method="post"
					action="edit.php?ID=<?php echo "$plantID"; ?>&type=plant"
				>
					<!-- entryName, entryDescription -->
					<label for="entryName">Plant Name</label>
					<input
						class="textInput"
						type="text"
						name="entryName"
						value= "<?php echo "$entryName"; ?>"
						pattern="^[a-zA-Z_ ]*${1,}"
						required
					/>

					<label for="entryDescription">Plant Description (optional)</label>
					<textarea name="entryDescription" rows="10" cols="89"><?php if ($entryDescription != 'NULL'){ echo "$entryDescription"; } ?>
					</textarea>

					<input type="submit" value="Edit Plant Info" />

					<?php
		                if(isset($_SESSION['editSuccess'])){
		                    $success = $_SESSION['editSuccess'];
		                    echo "<br><span><b>$success</b></span><br>";
		                    unset($_SESSION['editSuccess']);
		                }
		            ?>

				</form>

				<header class="title">
					<h2>Plant Media</h2>
					<p>(max of two media files per plant)</p>

					<?php
						// check whether media limit is exceeded
						// path to the SQLite database file
						$db_file = './museum.db';

						try {
						    // open connection to the museum database file
						    $db = new PDO('sqlite:' . $db_file);

						    // set errormode to use exceptions
						    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

						    // prepare to fetch count of media files associated with this entry
							$result = $db->prepare("SELECT COUNT(*) AS mediaCount FROM Media WHERE entryID = ?");

							// fetch count
							$result->execute([$plantID]);
							$row = $result->fetch(PDO::FETCH_ASSOC);
							$count = $row['mediaCount'];
							if ($count < 2){
								echo "<br><a href='addMedia.php?ID=$plantID' class='strong-button small'>Add new media for plant</a><br>";
							}
            			}
            			catch(PDOException $e){
							die('Exception : '.$e->getMessage());
						}

						// disconnect from db
						$db = null;

		                if(isset($_SESSION['success'])){
		                    $success = $_SESSION['success'];
		                    echo "<br><span><b>$success</b></span><br>";
		                    unset($_SESSION['success']);
		                }
		                if(isset($_SESSION['error'])){
		                    $error = $_SESSION['error'];
		                    echo "<br><span><b>$error</b></span><br>";
		                    unset($_SESSION['error']);
		                }
	           		?>

				<!-- Display Plant Media -->
				<?php

				// path to the SQLite database file
				$db_file = './museum.db';

				try {
				    // open connection to the museum database file
				    $db = new PDO('sqlite:' . $db_file);

				    // set errormode to use exceptions
				    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				    // select media related to this plant
			        $results = $db->query("SELECT * FROM Media WHERE entryID = $plantID");
			        $t = $results->fetchAll(PDO::FETCH_ASSOC);

			        echo '<br>';

			        foreach($t as $tuple) {
			        	$mediaType = $tuple["mediaType"];
			    		$location = $tuple["location"];
			    		$mediaDescription = $tuple["description"];
			    		echo '<br>';
			    		if ($mediaType == 'photo'){
			    			echo '<img src="'.$location.'" width=auto height=300 >';
			    		}
			    		else if ($mediaType == 'video'){
			    			echo '<video width="320" height="240" controls> <source src="'.$location.'"></video>';
			    		}
			    		else if ($mediaType == 'audio'){
			    			echo '<audio controls> <source src="'.$location.'"></audio>';
			    		}
			    		echo ' <a class="strong-button small" href="remove.php?mediaID='.$tuple['mediaID'].'&type=plant">Remove media</a><br><br>';
			    		echo '<form action="edit.php?mediaID='.$tuple['mediaID'].'&type=plant" method="post">';
						echo '<textarea name="mediaDescription" rows="10" cols="89">';
						if ($mediaDescription != "NULL"){ echo "$mediaDescription"; };
						echo '</textarea>
						<input type="submit" class="strong-button small" value=" Edit Media Description "></td>
	                    </form><br>';
					}

			    	$db = null;

			        exit();
				}
				catch(PDOException $e){
					die('Exception : '.$e->getMessage());
				}

				?>

				</header>

			</article>
		</div>
	</body>
</html>

<?php
	unset($_SESSION['success']);
	unset($_SESSION['error']);
?>

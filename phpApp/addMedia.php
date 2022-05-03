<?php
	session_start();

	if($_SESSION['userType'] != "Admin"){
        header("Location: museumLogin.php");
    }
?>

<!DOCTYPE html>
<html>

<?php

// get artifactID from URL
$artifactID = $_GET['ID'];
$iderror = "Invalid artifact ID (please select an artifact from the list below).";

// path to the SQLite database file
$db_file = './museum.db';

try {
    // open connection to the museum database file
    $db = new PDO('sqlite:' . $db_file);

    // set errormode to use exceptions
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare to fetch info of artifact item with this id
	$stmt = $db->prepare("select * from Entry where entryID = ?");

	// fetch info of artifact with this id
	$stmt->execute([$artifactID]);
	$tuple = $stmt->fetch(PDO::FETCH_ASSOC);

	// if artifactID was invalid (if no artifact with this id)
	if (empty($tuple)){
		$_SESSION['error'] = $iderror;
		$db = null;
		header("Location: artifactList.php");
	}

	// if artifactID was valid, define variables
	$entryName = $tuple['entryName'];
	$entryDescription = $tuple['entryDescription'];
	$entryType =  $tuple['entryType'];

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
		<title>Add media to artifact</title>
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
					<h2>Add media to artifact</h2>
				</header>

				<!-- Form -->
				<form
					class="museumForm"
					method="post"
					action="add.php?artifactID=<?php echo "$artifactID"; ?>"
					enctype="multipart/form-data"
				>

					<div>What type of media would you like to add?</div>
					<div><input type="radio" id="photo" name="mediaType" value="photo" required><label for="photo"> Photo (jpg, jpeg, or png)</label></div>
					<?php
						if ($tuple['entryType'] == 'artifact'){
							echo '<div><input type="radio" id="video" name="mediaType" value="video" required><label for="video"> Video (mp4 or mov)</label></div>';
						}
					?>
					<div><input type="radio" id="audio" name="mediaType" value="audio" required><label for="audio"> Audio (mp3, m4a, or wav)</label></div><br>

					<label for="mymedia">Please select a file (20 MB size limit):</label>
  					<input type="file" id="mymedia" name="mymedia" required>

  					<br>

  					<?php
  						if(isset($_SESSION['error'])){
		                   			$error = $_SESSION['error'];
		                    			echo "<br><span><b>$error</b></span><br>";
		                		}
  					?>

  					<br>

  					<label for="mediaDescription">Media Description (optional)</label>
					<textarea name="mediaDescription" rows="10" cols="89"></textarea>

				   	<input type="submit" value="Upload Now">

				</form>
			</article>
		</div>
	</body>
</html>

<?php
	unset($_SESSION['success']);
	unset($_SESSION['error']);
?>

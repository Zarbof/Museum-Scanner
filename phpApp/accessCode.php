<?php
	session_start();

	if($_SESSION['userType'] != "Admin"){
        header("Location: museumLogin.php");
    }

    // path to the SQLite database file
	$db_file = './museum.db';

	try {
	    // open connection to the museum database file
	    $db = new PDO('sqlite:' . $db_file);

	    // set errormode to use exceptions
	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    	// prepare to fetch token
		$stmt = $db->prepare("select * from token");

		// fetch token
		$stmt->execute();
		$tuple = $stmt->fetch(PDO::FETCH_ASSOC);

		// set values
		$tokenValue = $tuple['tokenValue'];
		$lastChanged = $tuple['lastChanged'];
    }
    catch(PDOException $e){
		die('Exception : '.$e->getMessage());
	}

	// disconnect from db
	$db = null;

?>

<!DOCTYPE html>
<html>
	<head>
		<link rel="icon" href="http://lelooska.org/wp-content/uploads/2013/01/salmon_transparent.png">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<link href='//fonts.googleapis.com/css?family=Forum|Open+Sans:600,regular,italic,700&amp;subset=latin' rel='stylesheet' type='text/css'>
		<meta charset="UTF-8" />
		<title>Access Code</title>
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
		            <h2>Access Code</h2>
		        </header>
				<br>
		            <header class="title">
		            <a href="adjustCode.php" class="strong-button big">Change Access Code</a>
		            <br><br><br>
		            <?php
						$date = DateTime::createFromFormat('U', $lastChanged);
						$date->setTimeZone(new DateTimeZone('America/Los_Angeles'));
						$date= $date->format('m-d-Y g:i A');
						echo '<b>Current Access Code:</b> '.$tokenValue.'';
						echo '<br><b>Last Updated:</b> ';
						echo $date;
		            ?>
		        </header>
			</article>
		</div>
	</body>
</html>

<?php
	unset($_SESSION['success']);
?>

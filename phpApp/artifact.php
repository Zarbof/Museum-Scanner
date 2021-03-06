<?php
	session_start();
?>

<!DOCTYPE html>
<html>

<?php

if (!isset($_GET['ID'])) {
	header("Location: nav.php");
}

// get artifactID from URL
$artifactID = $_GET['ID'];

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
		$db = null;
		header("Location: nav.php");
	}

	// if artifactID was valid, define variables
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
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<link href='//fonts.googleapis.com/css?family=Forum|Open+Sans:600,regular,italic,700&amp;subset=latin' rel='stylesheet' type='text/css'>
		<meta charset="UTF-8" />
		<title>Artifact Info</title>
		<link rel="stylesheet" href="styles.css" />
	</head>
	<body>
		<div class="page">
			<header class="menu-container">
                <h1 class="logo">
                	<img src="./media/salmon.png" width=auto height=100 >
                    <a class="logo-link" href="./nav.php">Lelooska Museum</a>
                </h1>
                <nav class="menu">
					<li><a class="nav-link" href="./museumLogin.php">Login</a></li>
				</nav>
            </header>

			<!--Title and Form-->
			<article class="content">
				<header class="title">
					<h2><?php echo "$entryName"; ?></h2>
					<p><br><?php echo "$entryDescription"; ?></p>

				<!-- Display Artifact Info and Media -->
				<?php

				// path to the SQLite database file
				$db_file = './museum.db';

				try {
				    // open connection to the museum database file
				    $db = new PDO('sqlite:' . $db_file);

				    // set errormode to use exceptions
				    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				    // select media related to this artifact
			        $results = $db->query("SELECT * FROM Media WHERE entryID = $artifactID");
			        $t = $results->fetchAll(PDO::FETCH_ASSOC);

			        foreach($t as $tuple) {
			        	$mediaType = $tuple["mediaType"];
			    		$location = $tuple["location"];
			    		$mediaDescription = $tuple["description"];
			    		echo '<br>';
			    		if ($mediaType == 'photo'){
			    			echo '<img src="'.$location.'" width=auto height=300 ><br><br>';
			    		}
			    		else if ($mediaType == 'video'){
			    			echo '<video width="320" height="240" controls> <source src="'.$location.'"></video><br><br>';
			    		}
			    		else if ($mediaType == 'audio'){
			    			echo '<audio controls> <source src="'.$location.'"></audio><br><br>';
			    		}
			    		if ($mediaDescription != "NULL"){
			    			echo "$mediaDescription<br>";
			    		};
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
?>

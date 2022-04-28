<?php
	session_start();

	if($_SESSION['userType'] != "Admin"){
        header("Location: museumLogin.php");
    }

?>

<!DOCTYPE html>
<html>

<?php

// path to the SQLite database file
$db_file = './museum.db';

try {
    // open connection to the museum database file
    $db = new PDO('sqlite:' . $db_file);

    // set errormode to use exceptions
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare to fetch account info
	$stmt = $db->prepare("select * from User");

	// fetch account info
	$stmt->execute();
	$tuple = $stmt->fetch(PDO::FETCH_ASSOC);

	// define variables
	$username = $tuple['username'];
	$password = $tuple['password'];

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
		<title>Account Information</title>
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
					<h2>Account Information</h2>
				</header>

				<!-- Form -->
				<form
					class="museumForm"
					method="post"
					action="editAccount.php"
				>
					<!-- username, password -->
					<label for="username">Username</label>
					<input
						class="textInput"
						type="text"
						name="username"
						value= "<?php echo "$username"; ?>"
						pattern="[A-Za-z0-9]{1,}"
						required
					/>

					<label for="password">Password</label>
					<input
						class="textInput"
						type="text"
						name="password"
						value= "<?php echo "$password"; ?>"
						pattern="[A-Za-z0-9]{1,}"
						required
					/>

					<input type="submit" value="Update Account Information">

					<?php
		                if(isset($_SESSION['success'])){
		                    $success = $_SESSION['success'];
		                    echo "<br><br><span><b>$success</b></span><br>";
		                    unset($_SESSION['success']);
		                }
		            ?>

				</form>

			</article>
		</div>
	</body>
</html>

<?php
	unset($_SESSION['success']);
?>

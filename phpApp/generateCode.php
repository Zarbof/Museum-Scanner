<?php
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
		<title>Alphanumeric Code</title>
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
					<li><a class="nav-link" href="./account.php">Account Info</a></li>
					<li><a class="nav-link" href="./signOut.php">Sign Out</a></li>
				</nav>
			</header>

			<!--Title and Form-->
						<article class="content">
				<header class="title">
		            <br>
		            <h2>Alphanumeric Code</h2>
		            <br>
		            <a href="generateCode.php?code=true" class="strong-button small">Generate new alphanumeric code</a>
		            <?php
			            if (isset($_GET['code'])){
			            	echo '<br><br>';
			            	echo bin2hex(random_bytes(3));
			            }
		            ?>
			</article>
		</div>
	</body>
</html>

<?php
	unset($_SESSION['success']);
?>
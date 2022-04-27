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
		<title>Add Plant</title>
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
					<h2>Add Plant</h2>
				</header>

				<!-- Form -->
				<form
					class="museumForm"
					method="post"
					action="add.php?type=plant"
				>
					<!-- entryName, entryDescription -->
					<label for="entryName">Plant Name</label>
					<input
						class="textInput"
						type="text"
						name="entryName"
						pattern="^[a-zA-Z_ ]*${1,}"
						required
					/>

					<label for="entryDescription">Plant Description (optional)</label>
					<textarea name="entryDescription" rows="10" cols="89"></textarea>

					<input type="submit" value="Add Plant Info" />

					<?php
						if(isset($_SESSION['success'])){
							$success = $_SESSION['success'];
							echo "<br><span><b>$success</b></span>";
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
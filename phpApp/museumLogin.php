<?php
session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Museum Login</title>
		<link rel="stylesheet" href="styles.css" />
	</head>
	<body>
		<div class="page">
			<header class="menu-container">
				<h1 class="logo">
					<img src="./media/salmon.png" width=auto height=100 >
					<a class="logo-link" href="./artifactList.php">Lelooska Museum Login</a>
				</h1>
			</header>

			<!--Title and Form-->
			<article class="content">
				<header class="title">
					<h2>Museum Login</h2>
				</header>

				<!-- Form -->
				<form
					class="museumForm"
					method="post"
					action="userAuthentication.php"
				>
					<!-- username, password-->
					<label for="username">Username</label>
					<input
						class="textInput"
						type="text"
						name="username"
						pattern="[A-Za-z]{1,}"
						required
					/>

					<label for="password">Password</label>
					<input
						class="textInput"
						type="text"
						name="password"
						pattern="[A-Za-z0-9]{1,}"
						required
					/>

					<input type="submit" value="Login" />

					<?php
						if(isset($_SESSION['error'])){
							$error = $_SESSION['error'];
							echo "<br><span>$error</span>";
						}
					?>

				</form>
			</article>
		</div>
	</body>
</html>

<?php
	unset($_SESSION['error']);
?>
<?php
header('Access-Control-Allow-Origin: *');
session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<link rel="icon" href="http://lelooska.org/wp-content/uploads/2013/01/salmon_transparent.png">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<link href='//fonts.googleapis.com/css?family=Forum|Open+Sans:600,regular,italic,700&amp;subset=latin' rel='stylesheet' type='text/css'>
		<meta charset="UTF-8" />
		<title>Museum Login</title>
		<link rel="stylesheet" href="styles.css" />
	</head>
	<body>
		<div class="page">
			<header class="menu-container">
				<h1 class="logo">
					<img src="./media/salmon.png" width=auto height=100 >
					<a class="logo-link" href="./artifactList.php">Lelooska Museum</a>
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
						pattern="[A-Za-z0-9]{1,}"
						required
					/>

					<label for="password">Password</label>
					<input
						class="textInput"
						type="password"
						name="password"
						id="myInput"
						pattern="[A-Za-z0-9]{1,}"
						required
					/>

					<br><input type="checkbox" onclick="myFunction()"> Show Password

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

<script type="text/javascript">
function myFunction() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
</script>

<?php
	unset($_SESSION['error']);
?>

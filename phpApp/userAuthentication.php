<?php
session_start();
?>

<!DOCTYPE html>
<html>
<body>

<?php
	
	$username = $_POST['username'];
	$password = $_POST['password'];
    $usererror = "Incorrect username (user does not exist).";
    $passerror = "Incorrect password.";

    // path to the SQLite database file
    $db_file = './museum.db';

    try {
        // open connection to the grocery database file
        $db = new PDO('sqlite:' . $db_file);

        // set errormode to use exceptions
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // prepare to fetch user info
        $stmt = $db->prepare("select * from user where username = ?");

		// fetch info of user with this username
		$stmt->execute([$username]);
		$tuple = $stmt->fetch(PDO::FETCH_ASSOC);

		$userPassword = $tuple['password'];

		// if username was invalid (if no user with this username)
		if (empty($tuple)){
			$_SESSION['error'] = $usererror;
      		$db = null;
			header("Location: museumLogin.php");
		}
		// if username was valid but password was invalid
		else if ($userPassword != $password){
			$_SESSION['error'] = $passerror;
        	$db = null;
			header("Location: museumLogin.php");
		}
		else{
			$_SESSION['userType'] = "Admin";
        	$db = null;
			header("Location: artifactList.php");
		}

        exit();
    }
    catch(PDOException $e) {
        die('Exception : '.$e->getMessage());
    }
?>

</body>
</html>
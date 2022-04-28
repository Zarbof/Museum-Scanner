<?php
session_start();
?>

<!DOCTYPE html>
<html>
<body>
<?php
    

    // path to the SQLite database file
    $db_file = './museum.db';

    try {
        // open connection to the museum database file
        $db = new PDO('sqlite:' . $db_file);

        // set errormode to use exceptions
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    	$code = random_int(10000, 99999);
		// prepare to update token
        $qry = $db->prepare('UPDATE Token SET tokenValue = ?, lastChanged = ? WHERE tokenID = ?');
        $qry->bindParam(1, $tokenValue);
        $qry->bindParam(2, $lastChanged);
        $qry->bindParam(3, $tokenID);

        // set values of input fields
		$tokenValue = $code;
        $lastChanged = time();
		$tokenID = 1;

		// update token
		$qry->execute();

        // disconnect from db
        $db = null;

        header("Location: accessCode.php");
    }
    catch(PDOException $e) {
        die('Exception : '.$e->getMessage());
    }
?>

</body>
</html>

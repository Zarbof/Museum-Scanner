<?php
    header('Access-Control-Allow-Origin: *');

    // get artifactID
	$artifactID = $_POST['id'];

	// path to the SQLite database file
	$db_file = './museum.db';

	try {
	    // open connection to the museum database file
	    $db = new PDO('sqlite:' . $db_file);

	    // set errormode to use exceptions
	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    // prepare to fetch info of artifact item with this id
		$stmt = $db->prepare("select * from Token");

		// fetch info of artifact with this id
		$stmt->execute([$artifactID]);
		$tuple = $stmt->fetch(PDO::FETCH_ASSOC);

		// if artifactID was invalid (if no artifact with this id)
		if (empty($tuple)){
			$db = null;
			echo ("No Tokens in Databse");
		}
		else{
			// if token exists, echo its str
			echo json_encode($tuple);

		}
		// disconnect from db
	    $db = null;
	}
	catch(PDOException $e){
		die('Exception : '.$e->getMessage());
	}
?>
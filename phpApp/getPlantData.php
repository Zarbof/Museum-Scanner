<?php
    header('Access-Control-Allow-Origin: *');

    // get plantID
	$plantID = $_POST['id'];

	// path to the SQLite database file
	$db_file = './museum.db';

	try {
	    // open connection to the museum database file
	    $db = new PDO('sqlite:' . $db_file);

	    // set errormode to use exceptions
	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    // prepare to fetch info of artifact item with this id
		$stmt = $db->prepare("select * from Entry where entryType = 'plant'");

		// fetch info of artifact with this id
		$stmt->execute([$plantID]);
		$tuple = $stmt->fetch(PDO::FETCH_ASSOC);

		// if artifactID was invalid (if no artifact with this id)
		if (empty($tuple)){
			$db = null;
			echo ("Artifact ID invalid");
		}
		else{
			// if artifactID was valid, echo basic artifact info
			echo json_encode($tuple);

			// echo media info
			$results = $db->query("SELECT * FROM Media WHERE entryID = $plantID");
			$t = $results->fetchAll(PDO::FETCH_ASSOC);
			foreach($t as $tuple) {
				echo json_encode($tuple);
			}
		}
		// disconnect from db
	    $db = null;
	}
	catch(PDOException $e){
		die('Exception : '.$e->getMessage());
	}
?>
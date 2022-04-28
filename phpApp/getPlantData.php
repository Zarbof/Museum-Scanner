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

	    // prepare to fetch info of plants
		$stmt = $db->query("select * from Entry where entryType = 'plant'");
		// fetch info of plants
		$t = $stmt->fetchAll(PDO::FETCH_ASSOC);

		// if no plants
		if (empty($t)){
			$db = null;
			echo 'no plants';
		}
		else{
			foreach($t as $tuple){
				echo json_encode($t);
				$id = $tuple['entryID'];
				$media = $db->query("SELECT * FROM Media WHERE entryID = $id");
				$m = $media->fetchAll(PDO::FETCH_ASSOC);
				foreach($m as $mtuple){
					echo json_encode($m);
				}
			}
		}
		// disconnect from db
	    $db = null;
	}
	catch(PDOException $e){
		die('Exception : '.$e->getMessage());
	}
?>
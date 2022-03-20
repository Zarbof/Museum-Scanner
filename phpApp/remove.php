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

        if (isset($_GET['mediaID'])) { // if removing a piece of media

            $removeSuccess = "Media successfully removed!";
            $mediaID = $_GET['mediaID'];

            // prepare to fetch media info
            $stmt = $db->prepare("SELECT * from Media where mediaID = ?");

            // fetch info of media with this id
            $stmt->execute([$mediaID]);
            $tuple = $stmt->fetch(PDO::FETCH_ASSOC);

            $mediaPath = $tuple['location'] . $tuple['mediaName'];
            $entryID = $tuple['entryID'];

            // delete file from media folder
            unlink($mediaPath);

            // prepare to delete this media item from media table
            $stmt = $db->prepare("DELETE FROM Media WHERE mediaID = ?");

        	// delete media item
        	$stmt->execute([$mediaID]);

            // set success message
            $_SESSION['success'] = $removeSuccess;

            // disconnect from db
            $db = null;

            // redirect to editArtifact.php
            header("Location: editArtifact.php?ID=$entryID");

        }
        else if (isset($_GET['artifactID'])){ // if removing an artifact

            $removeSuccess = "Artifact successfully removed!";
            $artifactID = $_GET['artifactID'];

            //retrieve all media associated with this artifact
            $stmt = $db->prepare("select * from Media where entryID = ?");
            $stmt->execute([$artifactID]);
            $t = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // if media associated with artifact ID
            if (!empty($t)){
                foreach($t as $tuple){

                    $mediaPath = $tuple['location'] . $tuple['mediaName'];
                    // delete file from media folder
                    unlink($mediaPath);

                    $mediaID = $tuple['mediaID'];

                    // prepare to delete this media item from media table
                    $stmt = $db->prepare("DELETE FROM Media WHERE mediaID = ?");

                    // delete media item
                    $stmt->execute([$mediaID]);
                }
            }

            // prepare to delete this artifact item from entry table
            $stmt = $db->prepare("DELETE FROM Entry WHERE entryID = ?");

            // delete artifact
            $stmt->execute([$artifactID]);

            // set success message
            $_SESSION['success'] = $removeSuccess;

            // disconnect from db
            $db = null;

            // redirect to artifactList.php
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
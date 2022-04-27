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

            // redirect
            if ($_GET['type'] == 'artifact'){
                header("Location: editArtifact.php?ID=$entryID");
            }
            else if ($_GET['type'] == 'plant'){
                header("Location: editPlant.php?ID=$entryID");
            }

        }
        else if (isset($_GET['ID'])){ // if removing entry info

            $removeSuccess;
            if ($_GET['type'] == 'artifact'){
                $removeSuccess = "Artifact successfully removed!";
            }
            else if ($_GET['type'] == 'plant'){
                $removeSuccess = "Plant successfully removed!";
            }
            $id = $_GET['ID'];

            //retrieve all media associated with this entry
            $stmt = $db->prepare("select * from Media where entryID = ?");
            $stmt->execute([$id]);
            $t = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // if media associated with ID
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

            // prepare to delete this entry from entry table
            $stmt = $db->prepare("DELETE FROM Entry WHERE entryID = ?");

            // delete entry
            $stmt->execute([$id]);

            // set success message
            $_SESSION['success'] = $removeSuccess;

            // disconnect from db
            $db = null;

            // redirect
            if ($_GET['type'] == 'artifact'){
                header("Location: artifactList.php");
            }
            else if ($_GET['type'] == 'plant'){
                header("Location: plantList.php");
            }
        }

        exit();
    }
    catch(PDOException $e) {
        die('Exception : '.$e->getMessage());
    }
?>

</body>
</html>
